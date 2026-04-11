/**
 * 使用示例:
 *
 * const controller = new AbortController();
 * try {
 *   await fetchSSE(
 *     '/api/chat',
 *     'gemini', // 模型类型 ('gemini' 或 'glm')
 *     {
 *       method: 'POST',
 *       body: JSON.stringify({
 *         messages: [{ role: 'user', content: '你好' }],
 *         model: 'gemini-2.5-flash',
 *         inlineData: this.imageData,  // 可选，用于内联图片数据base64编码的字符串
 *       }),
 *       signal: controller.signal
 *     },
 *     (text, accumulated, rawData) => {
 *       console.log('新消息:', text, '累计:', accumulated, '原始数据:', rawData);
 *       // 更新 Token 计数（根据不同模型的响应结构提取）
 *       if (rawData.usageMetadata) {
 *          // Gemini 响应结构
 *          this.totalTokens = rawData.usageMetadata.totalTokenCount || 0;
 *       } else if (rawData.usage) {
 *          // GLM 响应结构
 *          this.totalTokens = rawData.usage.total_tokens || 0;
 *       }
 *     },
 *     (err) => {
 *       console.log("请求错误:", err);
 *       this.error = true;
 *       // 优先从 err.data 中获取结构化错误信息
 *       this.outputText = this.outputText = err.data?.error?.message || err.message || err;
 *       // 在发生错误时，确保 error 状态也被记录下来
 *       fullAiResponse = this.outputText;
 *     }
 *   );
 * } catch (e) {
 *   // 注意: 异步逻辑中的错误通常由 onError 回调处理
 * }
 *
 * // 终止请求:
 * // controller.abort();
 */

/**
 * 通用的 SSE (Server-Sent Events) 流式请求工具函数
 * @param {string} url 请求地址
 * @param {string} type 模型类型 ('gemini' 或 'glm')
 * @param {object} options 请求选项
 * @param {string} [options.method='GET'] 请求方法
 * @param {string|FormData|Blob} [options.body] 请求内容体
 * @param {AbortSignal} [options.signal] 用于终止请求的 AbortSignal 信号
 * @param {object} [options.headers] 额外的请求头信息
 * @param {function} onMessage 收到消息时的回调函数 (text: string, accumulatedText: string, rawData: object) => void
 * @param {function} onError 发生错误时的回调函数 (error: Error) => void
 */
window.fetchSSE = async function(url, type, options, onMessage, onError) {
  let reader;
  try {
    const { signal, ...fetchOptions } = options;

    // 发起 fetch 请求
    const response = await fetch(url, {
      ...fetchOptions,
      signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // 如果响应状态码不是 2xx，解析并抛出错误
    if (!response.ok) {
      const errorText = await response.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch (e) {
        // 如果不是 JSON，则保持原样
      }
      const error = new Error(errorJson?.error?.message || errorJson?.message || errorText);
      if (errorJson) error.data = errorJson;
      throw error;
    }

    // 检查是否为 SSE (Server-Sent Events) 响应
    const contentType = response.headers.get("Content-Type") || "";
    const isSSE = contentType.includes("text/event-stream") || contentType.includes("application/x-ndjson");

    // 如果不是 SSE，可能是一个普通的成功 JSON 响应
    if (!isSSE) {
      const responseText = await response.text();
      try {
        const jsonData = JSON.parse(responseText);
        if (jsonData.error) {
          throw new Error(responseText);
        }
        // 如果没有 error 字段，将其作为一条完整的消息处理
        onMessage(responseText, responseText, jsonData);
        return;
      } catch (e) {
        // 如果是手动抛出的错误，继续向上抛出
        if (e.message === responseText) throw e;
      }
    }

    // 获取可读流读取器
    reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = ""; // 累计的所有文本内容
    let buffer = ""; // 用于缓存跨分块读取时的不完整行

    // 检查请求是否已被中止
    if (signal?.aborted) {
      throw new DOMException("请求已终止", "AbortError");
    }

    // 循环读取流数据
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // 解码二进制数据并追加到缓冲区
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      // 最后一行可能不完整（比如 data: {"c...），暂存到 buffer 中等待下次读取
      buffer = lines.pop();

      for (const line of lines) {
        const trimmedLine = line.trim();
        // SSE 格式要求以 "data: " 开头
        if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;

        const dataStr = trimmedLine.slice(6).trim();
        // 结束标志
        if (dataStr === "[DONE]") break;

        try {
          const jsonData = JSON.parse(dataStr);
          // 业务逻辑错误处理
          if (jsonData.error) {
            const error = new Error(jsonData.error.message || dataStr);
            error.data = jsonData;
            throw error;
          }

          // 根据不同的模型类型提取增量文本
          let text = "";
          if (type === "gemini") {
            // Google Gemini API 响应格式
            text = jsonData.candidates?.[0]?.content?.parts?.[0]?.text || "";
          } else if (type === "glm") {
            // ChatGLM / OpenAI API 风格响应格式
            text = jsonData.choices?.[0]?.delta?.content || "";
          }

          if (text) {
            accumulatedText += text;
          }

          // 触发回调，传递当前片段和累计内容
          onMessage(text, accumulatedText, jsonData);
        } catch (e) {
          // 如果是业务逻辑错误，继续向上抛出以便由 onError 处理
          if (e.message === dataStr) throw e;
          // 避免因为解析单行 JSON 失败而中断整个流
          if (dataStr !== "[DONE]") {
            console.warn("解析 JSON 失败:", e, trimmedLine);
          }
        }
      }
    }
  } catch (error) {
    // 发生异常时关闭读取器
    if (reader) {
      try {
        await reader.cancel();
      } catch (e) {}
    }

    // 调用错误回调或在控制台打印
    if (onError) {
      onError(error);
    } else {
      console.error("SSE Error:", error);
    }
  }
}
