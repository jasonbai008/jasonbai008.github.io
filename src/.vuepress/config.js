module.exports = {
  title: "行云流水",
  description: "小白的个人博客",
  head: [
    ["link", { rel: "icon", href: "/home/logo.png" }], // favicon
    // ["script", {src: '/baiduStatics.js'}]
  ],
  host: "127.0.0.1",
  base: "/", // 同代码仓库名称
  dest: "docs", // 因为GitHub的Pages服务仅支持docs目录
  plugins: [
    "@vuepress/back-to-top",
    "@vuepress/medium-zoom",    
    // [
    //   "@vuepress-reco/vuepress-plugin-kan-ban-niang",
    //   {
    //     theme: ["blackCat"],
    //     clean: true,
    //   },
    // ],
  ],
  themeConfig: {
    logo: "/home/logo.png",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "爱生活",
        items: [
          {
            text: "日常",
            items: [
              { text: "关于我", link: "/life/about" },
              { text: "价值信条", link: "/life/values" },
              { text: "日常记录", link: "/life/daily" },
              { text: "日常办公", link: "/life/office" },
            ],
          },
          {
            text: "专业",
            items: [
              { text: '德纲说书', link: '/life/kengwang' },
              { text: "医学健康", link: "/life/health" },
              { text: "金融理财", link: "/life/financing" },
              { text: "职场法律", link: "/life/law" },
              { text: "诗词收藏", link: "/life/poems" },
            ],
          },
        ],
      },
      {
        text: "玩技术",
        items: [
          {
            text: "文档",
            items: [
              { text: "样式技巧", link: "/tech/styles" },
              { text: "前端技术", link: "/tech/frontend" },
              { text: "前端后端", link: "/tech/backend" },
              { text: "Vue专场", link: "/tech/vueTech" },
              { text: "网站部署", link: "/tech/deploy" },
            ],
          },
          {
            text: "资源",
            items: [
              { text: "Free AI", link: "/tech/ai" },
              // { text: "Cursor", link: "/tech/cursor" },
              { text: "开源项目", link: "/tech/projects" },
              { text: "实用网站", link: "/tech/recommend" },
              { text: "海上冲浪", link: "/tech/surf" },
            ],
          },
        ],
      },
      {
        text: "摄影集",
        items: [
          { text: "青葱岁月", link: "/album/memory" },
          { text: "日常随拍", link: "/album/free" },
          { text: "都市街景", link: "/album/streetscape" },
          { text: "自然风光", link: "/album/nature" },
        ],
      },
      {
        text: "超链接",
        items: [
          { text: "影视资源", link: "https://www.libvio.link/" },
          { text: "博客模板", link: "https://jasonbai008.github.io/doc/" },
          { text: "主题配置", link: "https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html" },
        ],
      },
      { text: "联系我", link: "/contact/" },
      { text: "GitHub", link: "https://github.com/JasonBai008" },
    ],
    sidebar: "auto", // 侧栏根据页面标题自动生成导航
    lastUpdated: "Last Updated", // string | boolean
    smoothScroll: true,
  },
  markdown: {
    extractHeaders: ["h2", "h3", "h4"], // 默认值: ['h2', 'h3']，可用在左侧展示更多级别的标题
  },
};
