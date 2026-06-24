/**
 * Free AI SDK
 * 用于简化大模型流式请求的调用
 * 支持Glm系列和Gemini系列模型
 *
 * 如何传递图片：
 * 在 messages 数组中，将 content 设置为数组形式，包含文字和图片对象。
 * 示例：
 * messages: [
 *   {
 *     role: "user",
 *     content: [
 *       { type: "text", text: "请描述这张图片" },
 *       { type: "image_url", image_url: { url: "data:image/jpeg;base64,..." } }
 *     ]
 *   }
 * ]
 */
const FreeAI = {
  defaultApiUrl: "https://freeai.jasonbai.dpdns.org",

  /**
   * 发送聊天请求
   * @param {Object} options
   * @param {string} options.model 模型名称
   * @param {Array} options.messages 会话消息列表。支持多模态输入，content 可为字符串或包含文本和图片的数组。
   * @param {string} [options.apiUrl] 接口地址 (可选)
   * @param {AbortSignal} [options.signal] 取消请求的信号 (可选)
   * @param {Function} [options.onMessage] 收到消息片段的回调 (delta) => {}
   * @param {Function} [options.onFinish] 生成完成的回调 () => {}
   * @param {Function} [options.onUsage] 收到 Token 使用信息的回调 (usage) => {}
   * @param {Function} [options.onError] 出错的回调 (error) => {}
   * @param {Function} [options.onStatus] 状态变更的回调 (statusText) => {}
   */
  async chat({ model, messages, apiUrl, signal, onMessage, onFinish, onUsage, onError, onStatus }) {
    const url = apiUrl || this.defaultApiUrl;

    if (onStatus) onStatus("正在请求接口...");

    const payload = {
      model: model,
      messages: messages,
      stream: true,
      stream_options: { include_usage: true }, // 请求包含使用量信息
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }

      if (onStatus) onStatus("正在接收数据流...");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let lines = buffer.split("\n");
        buffer = lines.pop();

        for (let line of lines) {
          line = line.trim();
          if (!line.startsWith("data: ")) continue;

          const dataStr = line.substring(6).trim();
          if (dataStr === "[DONE]") continue;

          try {
            const data = JSON.parse(dataStr);

            // 提取内容
            if (data.choices && data.choices[0] && data.choices[0].delta && data.choices[0].delta.content) {
              const content = data.choices[0].delta.content;
              if (onMessage) onMessage(content);
            }

            // 提取使用量 (OpenAI / GLM 格式)
            if (data.usage) {
              if (onUsage) onUsage(data.usage);
            }
          } catch (e) {
            console.error("解析单行 JSON 失败", e, line);
          }
        }
      }

      if (onStatus) onStatus("生成完成。");
      if (onFinish) onFinish();
    } catch (error) {
      if (onStatus) onStatus("请求发生错误！");
      if (onError) onError(error);
    }
  },
};

if (typeof window !== "undefined") {
  window.FreeAI = FreeAI;
}
