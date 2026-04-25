<template>
  <div class="cf-comment-container">
    <!-- 留言表单 -->
    <div class="comment-form card">
      <h3 class="title">给我留言</h3>
      <div class="form-group">
        <div class="input-row">
          <div class="input-item">
            <label for="nickname">昵称 <span class="required">*</span></label>
            <input type="text" id="nickname" v-model="form.nickname" placeholder="怎么称呼您？" :disabled="submitting" />
          </div>
          <div class="input-item">
            <label for="wechat">微信号</label>
            <input type="text" id="wechat" v-model="form.wechat" placeholder="方便我联系您 (选填)" :disabled="submitting" />
          </div>
        </div>
        <div class="input-item full-width">
          <label for="content">留言内容 <span class="required">*</span></label>
          <textarea id="content" v-model="form.content" placeholder="请输入..." rows="4" :disabled="submitting"></textarea>
        </div>
        <div class="form-footer">
          <button @click="submitComment" :disabled="submitting || !isFormValid" class="submit-btn">
            <template v-if="submitting">
              <span class="loading-icon"></span>
              提交中...
            </template>
            <template v-else>
              <svg class="send-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" transform="rotate(-45 12 12)"></path>
              </svg>
              提交留言
            </template>
          </button>
        </div>
      </div>
    </div>

    <!-- 留言列表 -->
    <div class="comment-list">
      <div class="list-header">
        <h3 class="title">留言列表 ({{ messages.length }})</h3>
      </div>

      <div v-if="loading && messages.length === 0" class="loading-state">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>

      <div v-else-if="messages.length === 0" class="empty-state">
        <p>暂无留言，快来抢沙发吧~</p>
      </div>

      <div v-else class="message-items">
        <div v-for="msg in messages" :key="msg.id" class="message-item">
          <div class="avatar">
            <img src="/home/user.png" alt="avatar" />
          </div>
          <div class="message-body">
            <div class="message-header">
              <div class="user-info">
                <span class="nickname" :title="msg.wechat">{{ msg.nickname }}</span>
              </div>
              <span class="time">{{ formatDate(msg.created_at) }}</span>
            </div>
            <div class="message-content">{{ msg.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提示框 -->
    <transition name="fade">
      <div v-if="toast.show" :class="['toast', toast.type]">
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CfComment",
  data() {
    return {
      messages: [],
      loading: false,
      submitting: false,
      form: {
        nickname: "",
        wechat: "",
        content: "",
      },
      toast: {
        show: false,
        message: "",
        type: "success",
      },
      apiUrl: "https://message.jasonbai.dpdns.org/api/messages",
    };
  },
  computed: {
    isFormValid() {
      return this.form.nickname.trim() && this.form.content.trim();
    },
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      if (this.loading) return;
      this.loading = true;
      try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error("获取留言失败");
        const data = await response.json();
        this.messages = data;
      } catch (error) {
        this.showToast(error.message, "error");
      } finally {
        this.loading = false;
      }
    },
    async submitComment() {
      if (!this.isFormValid || this.submitting) return;

      this.submitting = true;
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: this.form.nickname.trim(),
            wechat: this.form.wechat.trim(),
            content: this.form.content.trim(),
          }),
        });

        const result = await response.json();
        if (result.success) {
          this.showToast("留言成功！", "success");
          this.form.nickname = "";
          this.form.wechat = "";
          this.form.content = "";
          await this.fetchMessages(); // 刷新列表
        } else {
          throw new Error(result.message || "提交失败");
        }
      } catch (error) {
        this.showToast(error.message, "error");
      } finally {
        this.submitting = false;
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      const now = new Date();
      const diff = (now - date) / 1000; // 秒

      if (diff < 60) return "刚刚";
      if (diff < 3600) return Math.floor(diff / 60) + " 分钟前";
      if (diff < 86400) return Math.floor(diff / 3600) + " 小时前";
      if (diff < 2592000) return Math.floor(diff / 86400) + " 天前";

      return date.toLocaleDateString();
    },
    showToast(message, type = "success") {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.cf-comment-container {
  max-width: 800px;
  margin: 20px auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #2c3e50;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  padding: 24px;
  margin-bottom: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #42b983; /* Vue Theme Color */
  display: flex;
  align-items: center;
}

.title::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 18px;
  background: #42b983;
  margin-right: 10px;
  border-radius: 2px;
}

/* Form Styles */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-row {
  display: flex;
  gap: 16px;
}

.input-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-item label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #606266;
}

.required {
  color: #f56c6c;
  margin-left: 2px;
}

input,
textarea {
  padding: 10px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

input:disabled,
textarea:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.submit-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.send-icon {
  width: 18px;
  height: 18px;
}

.submit-btn:hover:not(:disabled) {
  background: #3aa876;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* List Styles */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.list-header .title {
  margin-top: 6px;
  margin-bottom: 0;
}

.message-items {
  border-top: 1px solid #ddd;
}

.message-item {
  display: flex;
  gap: 10px;
  padding: 15px 0 20px;
  border-bottom: 1px solid #ddd;
}

.message-item:last-child {
  border-bottom: none;
}

.avatar {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.message-body {
  flex: 1;
  min-width: 0;
  margin-right: 10px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 8px;
  margin-bottom: 6px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nickname {
  font-weight: 600;
  font-size: 1rem;
  color: #303133;
}

.wechat-tag {
  font-size: 0.75rem;
  background: #f0f9eb;
  color: #67c23a;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #e1f3d8;
  width: fit-content;
}

.time {
  font-size: 0.8rem;
  color: #909399;
}

.message-content {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #606266;
  word-break: break-all;
  white-space: pre-wrap;
  text-align: justify;
}

/* States */
.loading-state,
.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #909399;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #42b983;
  border-radius: 50%;
  margin: 0 auto 10px;
  animation: rotate 1s linear infinite;
}

/* Toast */
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 500;
}

.toast.success {
  background: #67c23a;
}
.toast.error {
  background: #f56c6c;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

/* Responsive */
@media (max-width: 600px) {
  .input-row {
    flex-direction: column;
    gap: 16px;
  }

  .card {
    padding: 16px;
  }

  .cf-comment-container {
    /* padding: 0 10px; */
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
