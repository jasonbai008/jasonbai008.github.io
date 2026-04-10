<template>
  <div class="chat-container">
    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.role]"
      >
        <div class="message-content">
          <!-- 只有当内容不为空时才渲染 Markdown -->
          <template v-if="msg.content">
            <div v-html="renderMarkdown(msg.content)"></div>
          </template>
          <!-- 当内容为空且正在加载时，显示三个小球的动画 -->
          <template v-else-if="isLoading && index === messages.length - 1">
            <div class="dot-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </template>
        </div>
      </div>

      <!-- 对话末尾的清空聊天记录按钮和灰色虚线 -->
      <div v-if="messages.length > 1" class="clear-history-divider">
        <div class="divider-line"></div>
        <button class="clear-history-btn" @click="clearMessages">
          清空聊天记录
        </button>
        <div class="divider-line"></div>
      </div>
    </div>

    <div class="chat-input-area">
      <textarea
        v-model="userInput"
        @keydown.enter.exact.prevent="sendMessage"
        placeholder="输入消息，按 Enter 发送，同时按 Shift + Enter 换行..."
        rows="2"
      ></textarea>
      <button @click="sendMessage" :disabled="isLoading || !userInput.trim()">
        发送
      </button>
    </div>
  </div>
</template>

<script>
/**
 * ChatWithMe 组件
 * 提供一个简单的聊天界面，支持流式回复和 Markdown 渲染
 */
export default {
  name: "ChatWithMe",
  data() {
    return {
      messages: [
        {
          role: "assistant",
          content: "你好！我是 AI 小白，有什么可以帮你的吗？",
        },
      ],
      userInput: "",
      isLoading: false,
      controller: null,
      md: null, // 存储 markdown-it 实例
    };
  },
  mounted() {
    // 初始化 markdown-it 实例
    if (typeof window !== "undefined" && window.markdownit) {
      this.md = window.markdownit({
        html: true,
        linkify: true,
        typographer: true,
      });
    }
  },
  methods: {
    /**
     * 使用 markdown-it 渲染 Markdown 文本
     * @param {string} text - 需要渲染的文本
     */
    renderMarkdown(text) {
      if (!text) return "";
      if (this.md) {
        return this.md.render(text);
      }
      // 如果插件没加载成功，降级处理
      return text.replace(/\n/g, "<br>");
    },

    async sendMessage() {
      if (this.isLoading || !this.userInput.trim()) return;

      const prompt = this.userInput.trim();
      // 将用户消息加入对话列表
      this.messages.push({ role: "user", content: prompt });
      this.userInput = "";
      this.isLoading = true;

      // 推送消息后立即滚动到底部
      this.scrollToBottom();

      // 添加一个空的回复消息占位，用于流式显示回复内容
      const assistantMsg = { role: "assistant", content: "" };
      this.messages.push(assistantMsg);

      // 再次滚动以显示加载状态（小球）
      this.scrollToBottom();

      // 如果已有控制器，先取消之前的请求
      if (this.controller) {
        this.controller.abort();
      }
      this.controller = new AbortController();

      try {
        // 这里的 URL 和 type 需要根据您的实际后端接口进行调整
        const url = "https://zhipu.jasonbai.dpdns.org"; // 示例接口
        const type = "glm"; // 示例类型

        if (typeof fetchSSE === "undefined") {
          throw new Error("fetchSSE 工具未加载成功");
        }

        // 构造发送给智谱 AI 的对话历史，排除掉最后一个空的回复消息
        const history = this.messages.slice(0, -1).map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        await fetchSSE(
          url,
          type,
          {
            method: "POST",
            // 智谱 AI 要求的格式，使用 messages 字段发送数组
            body: JSON.stringify({
              messages: history,
              model: "glm-4-flash-250414",
            }),
            signal: this.controller.signal,
          },
          (text, accumulated) => {
            // 收到流式回复
            assistantMsg.content = accumulated;
            this.scrollToBottom();
          },
          (err) => {
            if (err.name === "AbortError") {
              console.log("用户终止了请求");
            } else {
              console.error("SSE 错误:", err);
              // 尝试解析错误消息，如果是 JSON 字符串则进一步提取
              let errorMsg = err.message || "无法连接到服务";

              // 处理可能包含 JSON 的错误消息
              if (errorMsg.includes("请求失败: ")) {
                try {
                  const jsonStr = errorMsg.replace("请求失败: ", "");
                  const errorObj = JSON.parse(jsonStr);
                  if (errorObj.error) {
                    errorMsg =
                      typeof errorObj.error === "string"
                        ? errorObj.error
                        : errorObj.error.message ||
                          JSON.stringify(errorObj.error);
                  }
                } catch (e) {
                  // 解析失败则保留原样
                }
              }

              assistantMsg.content += `\n\n[错误: ${errorMsg}]`;
            }
          }
        );
      } catch (e) {
        console.error("发送失败:", e);
        assistantMsg.content = "抱歉，发送消息时出现了问题。";
      } finally {
        this.isLoading = false;
        this.controller = null;
        this.scrollToBottom();
      }
    },

    scrollToBottom() {
      // 使用 requestAnimationFrame 或 $nextTick 确保 DOM 已渲染
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          // 直接将滚动条设置到最大高度
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    /**
     * 清空聊天记录，保留初始欢迎语
     */
    clearMessages() {
      if (confirm("确定要清空所有聊天记录吗？")) {
        this.messages = [
          {
            role: "assistant",
            content: "你好！我是 AI 小白，有什么可以帮你的吗？",
          },
        ];
        // 如果正在加载，停止当前的请求
        if (this.isLoading && this.controller) {
          this.controller.abort();
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 500px;
  background: #f9f9f9;
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-content {
  word-break: break-all;
}

/* 适配 Markdown 渲染后的样式 */
.message-content >>> p {
  margin: 0;
}
.message-content >>> p + p {
  margin-top: 8px;
}
.message-content >>> ul,
.message-content >>> ol {
  margin: 8px 0;
  padding-left: 20px;
}
.message-content >>> code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}
.message-content >>> pre {
  background-color: #f6f8fa;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 8px 0;
}
.message-content >>> pre code {
  background-color: transparent;
  padding: 0;
}
.message-content >>> blockquote {
  border-left: 4px solid #dfe2e5;
  color: #6a737d;
  padding-left: 10px;
  margin: 8px 0;
}
.message-content >>> img {
  max-width: 100%;
}
.message-content >>> table {
  border-collapse: collapse;
  width: 100%;
  margin: 8px 0;
}
.message-content >>> th,
.message-content >>> td {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}

.message.user {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  border-bottom-right-radius: 2px;
}

/* 用户消息中的代码块背景色调整 */
.message.user .message-content >>> code {
  background-color: rgba(255, 255, 255, 0.2);
}
.message.user .message-content >>> pre {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
}

.message.assistant {
  align-self: flex-start;
  background-color: #e9e9eb;
  color: #333;
  border-bottom-left-radius: 2px;
}

/* 三个小球的跳动动画 */
.dot-typing {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 20px;
}

.dot-typing span {
  width: 6px;
  height: 6px;
  background-color: #909399;
  border-radius: 50%;
  animation: dot-typing 1.4s infinite ease-in-out both;
}

.dot-typing span:nth-child(1) {
  animation-delay: -0.32s;
}

.dot-typing span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes dot-typing {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.6;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.chat-input-area {
  padding: 12px;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 10px;
  background: white;
}

textarea {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
}

textarea:focus {
  outline: none;
  border-color: #007bff;
}

button {
  padding: 0 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

.clear-history-divider {
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 10px;
}

.divider-line {
  flex: 1;
  border-top: 1px dashed #ccc;
}

.clear-history-btn {
  background: none;
  /* border: 1px solid #ddd; */
  color: #999;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.chat-container .clear-history-btn:hover {
  color: #666;
  border-color: #bbb;
  background-color: #f0f0f0;
}
</style>
