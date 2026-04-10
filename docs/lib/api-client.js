/**
 * 使用示例:
 * 
 * const controller = new AbortController();
 * try {
 *   await fetchSSE(
 *     '/api/chat',
 *     'gemini',
 *     {
 *       method: 'POST',
 *       body: JSON.stringify({ prompt: '你好' }),
 *       signal: controller.signal
 *     },
 *     (text, accumulated) => console.log('新消息:', text, '累计:', accumulated),
 *     (err) => {
 *       if (err.name === 'AbortError') console.log('用户手动终止');
 *       else console.error('请求发生错误:', err);
 *     }
 *   );
 * } catch (e) {
 *   // 注意: 异步逻辑中的错误通常由 onError 回调处理
 * }
 * 
 * // 终止请求:
 * // controller.abort();
 */

console.log('api-client.js loading...');

/**
 * 通用的 SSE (Server-Sent Events) 流式请求工具函数
 * 已改为全局函数以支持在 VuePress 组件中直接使用
 */
window.fetchSSE = async function(url, type, options, onMessage, onError) {
  console.log('fetchSSE called with:', url, type);
  let reader;
  try {
    const { signal, ...fetchOptions } = options;

    const response = await fetch(url, {
      ...fetchOptions,
      signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`请求失败: ${errorText}`);
    }

    reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";
    let buffer = ""; // 用于缓存不完整的行

    // 如果信号已经中止，直接退出
    if (signal?.aborted) {
      throw new DOMException("请求已终止", "AbortError");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      const lines = buffer.split("\n");
      // 保留最后一行（可能不完整）到 buffer
      buffer = lines.pop();

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;

        const dataStr = trimmedLine.slice(6).trim();
        if (dataStr === "[DONE]") break;

        try {
          const jsonData = JSON.parse(dataStr);
          let text = "";

          if (jsonData.error) {
            throw new Error(jsonData.error.message || jsonData.error);
          }

          // 根据类型提取文本
          if (type === "gemini") {
            text = jsonData.candidates?.[0]?.content?.parts?.[0]?.text;
          } else if (type === "glm") {
            text = jsonData.choices?.[0]?.delta?.content;
          }

          // 总是调用回调，以便处理 usage 等非文本数据
          if (text) {
            accumulatedText += text;
          }
                      
          onMessage(text || "", accumulatedText, jsonData);
        } catch (e) {
          // 忽略不完整的 JSON 块或解析错误
          if (dataStr !== "[DONE]") {
            console.warn("解析 JSON 失败:", e, trimmedLine);
          }
        }
      }
    }
  } catch (error) {
    // 显式取消 reader 以释放锁
    if (reader) {
      try {
        await reader.cancel();
      } catch (e) {
        // 忽略取消时的错误
      }
    }

    if (onError) {
      onError(error);
    } else {
      console.error("SSE Error:", error);
    }
  }
}
