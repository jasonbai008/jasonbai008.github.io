<template>
  <!-- Cloudflare AI Search 聊天机器人组件 -->
  <chat-bubble-snippet
    api-url="https://512502a3-0156-43b4-bf09-24c29c13ef69.search.ai.cloudflare.com"
    hide-branding="true"
    :translations="langObj"
  ></chat-bubble-snippet>
</template>

<script>
/**
 * CloudflareChat 组件
 * 用于在页面右下角显示 Cloudflare AI Search 的聊天气泡
 */
export default {
  name: "CloudflareChat",
  data() {
    return {
      langObj: JSON.stringify({
        chatPlaceholder: "请输入您的问题...",
        chatTitle: "开始聊天",
      }),
    };
  },
};
</script>

<style>
chat-bubble-snippet {
  --search-snippet-primary-color: #3eaf7c;
  --search-snippet-primary-hover: #3eaf7c;
  --search-snippet-focus-ring: #3eaf7c;
}
</style>
