/**
 * ==========================================
 * ZhipuChat - 智谱AI 轻量级前端调用插件
 * ==========================================
 *
 * 【功能简介】
 * 本插件用于在浏览器端直接调用智谱清言 (ZhipuAI) 的大模型接口。
 * 支持高度自定义配置、单轮简易对话及多轮复杂对话模式。
 * 同时支持流式和非流式两种输出方式。
 *
 * 【默认参数说明】
 * - apiKey: ""                     // (必填) 您的智谱 API Key
 * - model: "glm-4-flash-250414"    // (可选) 模型名称。默认使用 4-flash 版，性价比最高
 * - systemPrompt: "..."            // (可选) 系统人格设定，默认为 "你是一个有用的AI助手"
 * - temperature: 1.0               // (可选) 采样温度。值越高越随机，值越低越严谨。范围 (0, 1.0]
 * - top_p: 0.7                     // (可选) 核采样阈值。通常与 temperature 二选一使用
 * - endpoint: "https://..."        // (可选) API 请求地址，一般不需要修改，默认：https://open.bigmodel.cn/api/paas/v4/chat/completions
 * - thinking: { type: "disabled" } // (可选) 思考模式配置，部分模型支持启用深度思考
 *
 * 【可传参数列表 (constructor options)】
 * 初始化时可传入一个对象，包含以上任意参数进行覆盖。
 *
 * 【核心方法】
 * 1. chat(input, options):
 *    - input: 若为字符串则作为用户的 Prompt 发送；若为数组则视为完整的 messages 历史记录
 *    - options: { stream: false, signal: AbortSignal } - 支持流式输出设置及请求中断控制
 *
 * 2. chatStream(input, options):
 *    - 专门用于流式输出的方法，返回异步生成器。支持通过 options.signal 中断请求。
 *
 * 【1. 完整初始化示例 (包含所有配置项)】
 * -------------------------------------------------------------------------
 * const ai = new ZhipuChat({
 *     apiKey: "...",                           // 必填：您的 API Key
 *     model: "glm-4-flash-250414",             // 模型选择：如 glm-4-flash
 *     systemPrompt: "你是一个资深的程序员助手",  // 系统人格预设
 *     temperature: 0.95,                      // 采样温度：0~1 之间，值越大回复越随机
 *     top_p: 0.7,                             // 核采样阈值：0~1 之间
 *     max_tokens: 4095,                       // 最大生成长度
 *     thinking: { type: "disabled" },         // 思考模式：enabled (开启) / disabled (关闭)
 *     endpoint: "https://open.bigmodel.cn/api/paas/v4/chat/completions" // 接口地址
 * });
 *
 * 【2. 非流式调用示例】
 * -------------------------------------------------------------------------
 * async function askAI() {
 *     try {
 *         const result = await ai.chat("请帮我写一段关于JavaScript异步编程的总结");
 *
 *         // 1. 获取 AI 回复的纯文本内容
 *         console.log("AI 回复:", result.content);
 *
 *         // 2. 获取 Token 消耗统计
 *         console.log("消耗详情:", {
 *             "提示词消耗(prompt_tokens)": result.usage.prompt_tokens,
 *             "完成词消耗(completion_tokens)": result.usage.completion_tokens,
 *             "总计消耗(total_tokens)": result.usage.total_tokens
 *         });
 *
 *         // 3. 获取原始 API 响应数据
 *         console.log("原始数据:", result.fullResponse);
 *
 *     } catch (error) {
 *         console.error("对话发生错误:", error.message);
 *     }
 * }
 *
 * 【3. 流式调用示例】
 * -------------------------------------------------------------------------
 * async function askAIStream() {
 *     try {
 *         // 方式一：使用 chat 方法并传入 stream: true
 *         const stream = await ai.chat("请写一首关于春天的诗", { stream: true });
 *
 *         let fullContent = "";
 *         for await (const chunk of stream) {
 *             // chunk 包含当前流式数据块
 *             if (chunk.content) {
 *                 fullContent += chunk.content;
 *                 console.log("实时输出:", chunk.content);
 *             }
 *
 *             // 最后一个数据块会包含完整的 usage 信息
 *             if (chunk.isLast) {
 *                 console.log("Token消耗:", chunk.usage);
 *             }
 *         }
 *         console.log("完整回复:", fullContent);
 *
 *         // 方式二：使用专门的 chatStream 方法
 *         const stream2 = ai.chatStream("请写一首关于夏天的诗");
 *         for await (const chunk of stream2) {
 *             process.stdout.write(chunk.content); // 实时打印
 *         }
 *
 *     } catch (error) {
 *         console.error("流式对话发生错误:", error.message);
 *     }
 * }
 *
 * 【4. 请求中断示例】
 * -------------------------------------------------------------------------
 * async function askAIWithAbort() {
 *     const controller = new AbortController();
 *     const signal = controller.signal;
 *
 *     try {
 *         // 发起请求并传入 signal
 *         const promise = ai.chat("请写一篇长文...", { signal });
 *
 *         // 模拟在 1 秒后中断请求
 *         setTimeout(() => {
 *             console.log("正在中断请求...");
 *             controller.abort();
 *         }, 1000);
 *
 *         const result = await promise;
 *         console.log("结果:", result.content);
 *     } catch (error) {
 *         if (error.name === 'AbortError') {
 *             console.log("请求已成功中断");
 *         } else {
 *             console.error("发生其他错误:", error);
 *         }
 *     }
 * }
 *
 * ==========================================
 */

"use strict";

class ZhipuChat {
  /**
   * 初始化配置
   * @param {Object} options 配置项
   */
  constructor(options = {}) {
    // 默认参数
    const defaults = {
      apiKey: "31242ab69159419fbdaa93b1e92f6787.wgfdXMw4QrccuKa4", 
      endpoint: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
      model: "glm-4-flash-250414",
      systemPrompt: "你是一个有用的AI助手。",
      temperature: 1.0,
      thinking: { type: "disabled" },
    };

    // 合并用户配置
    this.config = Object.assign({}, defaults, options);

    if (!this.config.apiKey) {
      console.warn("ZhipuChat: 未配置 apiKey，请求可能会失败。");
    }
  }

  /**
   * 构建消息数组
   * @private
   */
  _buildMessages(input) {
    if (typeof input === "string") {
      return [
        { role: "system", content: this.config.systemPrompt },
        { role: "user", content: input },
      ];
    } else if (Array.isArray(input)) {
      return input;
    }
    throw new Error("input 必须是字符串或数组");
  }

  /**
   * 发送对话请求（支持流式和非流式）
   * @param {string|Array} input 用户输入的字符串或完整的 messages 数组
   * @param {Object} options 额外选项，如 { stream: true, signal: abortSignal }
   * @returns {Promise<Object|AsyncGenerator>} 非流式返回对象，流式返回异步生成器
   */
  async chat(input, options = {}) {
    const messages = this._buildMessages(input);
    const isStream = options.stream === true;
    const signal = options.signal;

    const requestBody = {
      model: this.config.model,
      messages: messages,
      temperature: this.config.temperature,
      stream: isStream,
      thinking: this.config.thinking,
    };

    // 添加可选的 max_tokens
    if (this.config.max_tokens) {
      requestBody.max_tokens = this.config.max_tokens;
    }

    // 添加可选的 top_p
    if (this.config.top_p) {
      requestBody.top_p = this.config.top_p;
    }

    try {
      const response = await fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(requestBody),
        signal: signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `HTTP error! status: ${response.status}`,
        );
      }

      // 流式响应处理
      if (isStream) {
        return this._handleStreamResponse(response);
      }

      // 非流式响应处理
      const data = await response.json();
      return {
        fullResponse: data,
        content: data.choices[0].message.content,
        usage: data.usage,
      };
    } catch (error) {
      console.error("ZhipuChat Request Failed:", error);
      throw error;
    }
  }

  /**
   * 专门用于流式输出的方法（便捷方法）
   * @param {string|Array} input 用户输入的字符串或完整的 messages 数组
   * @param {Object} options 额外选项，如 { signal: abortSignal }
   * @returns {AsyncGenerator} 异步生成器，逐块输出内容
   */
  async *chatStream(input, options = {}) {
    const stream = await this.chat(input, { ...options, stream: true });
    for await (const chunk of stream) {
      yield chunk;
    }
  }

  /**
   * 处理流式响应
   * @private
   * @param {Response} response fetch 响应对象
   * @returns {AsyncGenerator} 异步生成器
   */
  async *_handleStreamResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let finalUsage = null;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === "data: [DONE]") continue;

          if (trimmedLine.startsWith("data: ")) {
            try {
              const jsonStr = trimmedLine.slice(6);
              const chunk = JSON.parse(jsonStr);

              // 提取内容增量
              const delta = chunk.choices?.[0]?.delta || {};
              const content = delta.content || "";
              const reasoning = delta.reasoning_content || "";

              // 检查是否为最后一个数据块（包含 usage 信息）
              const isLast = !!chunk.usage;
              if (isLast) {
                finalUsage = chunk.usage;
              }

              yield {
                content: content,
                reasoning: reasoning,
                delta: delta,
                isLast: isLast,
                usage: finalUsage,
                rawChunk: chunk,
              };
            } catch (e) {
              console.warn("解析流式数据失败:", e, trimmedLine);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

if (typeof module === "object" && module.exports) {
  // Node.js环境
  module.exports = ZhipuChat;
} else {
  // 浏览器环境
  globalThis.ZhipuChat = ZhipuChat;
}
