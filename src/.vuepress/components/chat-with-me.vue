<template>
  <div class="chat-container">
    <div class="chat-messages" ref="messagesContainer">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
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
      <div v-if="messages.length > 1 && !isLoading" class="clear-history-divider">
        <div class="divider-line"></div>
        <button class="clear-history-btn" @click="clearMessages">清空聊天记录</button>
        <div class="divider-line"></div>
      </div>
    </div>

    <div class="chat-input-area">
      <textarea ref="inputTextArea" v-model="userInput" @keydown.enter.exact.prevent="sendMessage" @input="adjustTextareaHeight" placeholder="输入消息，按 Enter 发送，同时按 Shift + Enter 换行..." rows="3"></textarea>
      <button class="send-btn" @click="sendMessage" :disabled="isLoading || !userInput.trim()">
        <svg v-if="isLoading" viewBox="0 0 24 24" width="16" height="16">
          <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </svg>
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
    // 初始化输入框高度
    this.adjustTextareaHeight();
  },
  methods: {
    /**
     * 自动调整输入框高度，最多 4 行
     */
    adjustTextareaHeight() {
      const textarea = this.$refs.inputTextArea;
      if (textarea) {
        // 先重置高度以便重新计算 scrollHeight
        textarea.style.height = "auto";
        // 获取计算出的样式
        const style = window.getComputedStyle(textarea);
        const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        const lineHeight = parseFloat(style.lineHeight) || 21; // 默认 1.5 倍行高
        const maxHeight = padding + lineHeight * 4; // 计算 4 行的最大高度

        // 设置新高度，但不超过 4 行
        if (textarea.scrollHeight > maxHeight) {
          textarea.style.height = `${maxHeight}px`;
          textarea.style.overflowY = "auto";
        } else {
          textarea.style.height = `${textarea.scrollHeight}px`;
          textarea.style.overflowY = "hidden";
        }
      }
    },
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

      // 发送后重置输入框高度
      this.$nextTick(() => {
        this.adjustTextareaHeight();
      });

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

        fetchSSE(url, type, {
          method: "POST",
          signal: this.controller.signal,
          // 智谱 AI 要求的格式，使用 messages 字段发送数组
          body: JSON.stringify({
            messages: history,
            model: "glm-4-flash-250414",
          }),
        })
          .then((text, accumulated) => {
            // 收到流式回复
            assistantMsg.content = accumulated;
            this.scrollToBottom();
          })
          .catch((err) => {
            // 错误处理
            assistantMsg.content = err.data?.error?.message || err.message || err;
          })
          .finally(() => {
            // 无论成功还是失败，最终都会重置状态
            this.isLoading = false;
            this.controller = null;
            this.scrollToBottom();
          });
      } catch (e) {
        console.error("初始化发送失败:", e);
        assistantMsg.content = "抱歉，发送消息时出现了问题。";
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
    },
  },
};
</script>

<style scoped>
.chat-container {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 530px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* Firefox 滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

/* Webkit 滚动条样式 (Chrome, Safari, Edge) */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}

/* 隐藏滚动条两端的箭头按钮 */
.chat-messages::-webkit-scrollbar-button {
  display: none;
}

.message {
  max-width: 80%;
  padding: 10px 16px;
  border-radius: 16px;
  line-height: 1.6;
  font-size: 14.5px;
  position: relative;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-content {
  word-break: break-word;
}

/* 适配 Markdown 渲染后的样式 */
.message-content >>> p {
  margin: 0;
}
.message-content >>> p + p {
  margin-top: 10px;
}
.message-content >>> ul,
.message-content >>> ol {
  margin: 10px 0;
  padding-left: 24px;
}
.message-content >>> code {
  background-color: rgba(66, 185, 131, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Fira Code", monospace;
  color: #2c3e50;
  font-size: 0.9em;
}
.message-content >>> pre {
  background-color: #282c34;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
  color: #abb2bf;
}
.message-content >>> pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-size: 13px;
}
.message-content >>> blockquote {
  border-left: 4px solid #42b983;
  background: rgba(66, 185, 131, 0.05);
  color: #4a5568;
  padding: 8px 16px;
  margin: 12px 0;
  border-radius: 0 4px 4px 0;
}
.message-content >>> img {
  max-width: 100%;
  border-radius: 8px;
  margin: 8px 0;
}
.message-content >>> table {
  border-collapse: collapse;
  width: 100%;
  margin: 12px 0;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #e2e8f0;
}
.message-content >>> th {
  background-color: #f8fafc;
  font-weight: 600;
  text-align: left;
}
.message-content >>> th,
.message-content >>> td {
  border: 1px solid #e2e8f0;
  padding: 10px 14px;
}

.message.user {
  align-self: flex-end;
  background-color: #42b983;
  color: white;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2);
}

/* 用户消息中的代码块背景色调整 */
.message.user .message-content >>> code {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}
.message.user .message-content >>> pre {
  background-color: rgba(0, 0, 0, 0.2);
  color: #eee;
}
.message.user .message-content >>> pre code {
  color: inherit;
}

.message.assistant {
  align-self: flex-start;
  background-color: #f1f5f9;
  color: #1e293b;
  border-bottom-left-radius: 4px;
  border: 1px solid #e2e8f0;
}

/* 三个小球的跳动动画 */
.dot-typing {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 24px;
}

.dot-typing span {
  width: 8px;
  height: 8px;
  background-color: #42b983;
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
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.chat-input-area {
  padding: 16px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  background: white;
  position: relative;
}

textarea {
  flex: 1;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 10px 44px 10px 14px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
  background: #f8fafc;
  transition: all 0.2s;
}

textarea:focus {
  outline: none;
  border-color: #42b983;
  background: white;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.send-btn {
  position: absolute;
  right: 28px;
  bottom: 28px;
  width: 34px;
  height: 34px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}

.send-btn:disabled {
  background: #a6e7ca;
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  background: #33a06f;
  transform: scale(1.05);
}

.send-btn:not(:disabled):active {
  transform: scale(0.95);
}

.clear-history-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  gap: 7px;
}

.divider-line {
  flex: 1;
  border-top: 1px solid #e2e8f0;
}

.clear-history-btn {
  background: #f8fafc;
  border: 1px solid transparent;
  color: #64748b;
  font-size: 12px;
  padding: 5px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  height: auto;
}

.chat-container .clear-history-btn:hover {
  color: #42b983;
  border-color: #42b983;
  background-color: rgba(66, 185, 131, 0.05);
}
</style>
