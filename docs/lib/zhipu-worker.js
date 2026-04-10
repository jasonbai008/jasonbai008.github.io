/**
 * Cloudflare Worker for Zhipu AI (GLM)
 * 支持流式转发数据
 */

export default {
  async fetch(request, env) {
    // 处理跨域 (CORS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      // 解析请求体，支持 prompt(单次对话) 和 messages(连续对话)
      const { prompt, messages, model: modelName } = await request.json();
      
      // 从环境变量中获取 API Key
      const API_KEY = env.ZHIPU_API_KEY;

      if (!API_KEY) {
        return new Response(JSON.stringify({ error: "ZHIPU_API_KEY not found in environment" }), {
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        });
      }

      // 构造请求智谱 API 的消息数组
      let apiMessages = [];
      if (messages && Array.isArray(messages) && messages.length > 0) {
        // 如果传入了 messages 数组，说明是连续对话，直接使用
        apiMessages = messages;
      } else if (prompt) {
        // 如果只传入了 prompt 字符串，说明是单次对话，包装成 messages 格式
        apiMessages = [{ role: "user", content: prompt }];
      } else {
        // 参数校验失败
        return new Response(JSON.stringify({ error: "参数错误：必须提供 prompt 或 messages" }), {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        });
      }

      // 默认模型并统一转为小写
      const targetModel = modelName ? modelName.toLowerCase() : "glm-4.7-flash";

      // 请求智谱 AI v4 接口
      const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: targetModel,
          messages: apiMessages,
          stream: true, // 开启流式传输
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return new Response(JSON.stringify({ error: `智谱 API 请求失败: ${errorText}` }), {
          status: response.status,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        });
      }

      // 直接转发流式响应
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "Access-Control-Allow-Origin": "*", // 允许前端跨域访问
        },
      });

    } catch (error) {
      console.error("Zhipu Worker Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      });
    }
  },
};
