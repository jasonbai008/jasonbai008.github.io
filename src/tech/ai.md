# Free AI

::: tip 前言
付费上班时代已来临，今天你使用AI偷懒了吗？
:::

## AI 免费策略

| 功能场景          | 官网                                                                                                                         | 推荐模型                                                     | 备注 / 额度                      |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :------------------------------- |
| **开发简单功能**  | <a href="https://trae.cn/" target="_blank">Trae CN 国内版</a>                                                                | **<span style="color: #3064F4">GLM-5</span>**                | 完全免费，可惜需要排队           |
| **开发复杂功能**  | <a href="https://trae.ai/" target="_blank">Trae 国际版</a>                                                                   | **<span style="color: #4285F4">Gemini-3-Pro-Preview</span>** | 每月$3免费额度                   |
| **额度补充**      | <a href="https://aistudio.google.com/app/prompts/new_chat?model=gemini-3.1-pro-preview" target="_blank">Google AI Studio</a> | **<span style="color: #4285F4">Gemini-3-Pro-Preview</span>** | 免费10多次/天，翻墙必须欧美节点  |
| **额度补充**      | <a href="https://deepsider.ai/zh" target="_blank">DeepSider</a>                                                              | **<span style="color: #d97757">Claude-Sonnet-4.6</span>**    | Trae 额度用完后，每天可白嫖 2 次 |
| **日常提问**      | <a href="https://chat.deepseek.com/" target="_blank">DeepSeek</a>                                                            | **<span style="color: #6066FF">DeepSeek</span>**             | 官网尽情使用                     |
| **AI 图片生成**   | <a href="https://deepsider.ai/zh" target="_blank">DeepSider</a>                                                              | **<span style="color: #f76707">Nano Banana 2</span>**        | 每天可以白嫖 3 次                |
| **UI 设计稿生成** | [Stitch](https://stitch.withgoogle.com/)                                                                                     | **<span style="color: #4285F4">Gemini</span>**               | 目前免费                         |
| **AI 免费去水印** | <a href="https://magiceraser.org/zh/remove-watermark-from-image/" target="_blank">Magic Eraser</a>                           | -                                                            | 免费                             |

<style>
    /* 调整表格样式以适应大模型颜色展示 */
    h2[id="ai-免费策略"] + table {
        width: 100%;
        display: table;
    }
    h2[id="ai-免费策略"] + table th,
    h2[id="ai-免费策略"] + table td {
        padding: 10px;
        text-align: left;
    }
</style>

## AI 使用策略

- 日常提问：**<span style="color: #6066FF">DeepSeek</span>**
- 日常开发：**<span style="color: #3064F4">GLM-5</span>**
- 前端开发：**<span style="color: #4285F4">Gemini-3.x</span>**
- 后端开发：**<span style="color: #10a37f">GPT-5.x</span>**
- 不差钱的：**<span style="color: #d97757">Claude Opus 4.6</span>**

## AI 问答

- [DeepSeek](https://chat.deepseek.com/)
- [DouBao](https://www.doubao.com/chat)

## AI 插件

- [TONGYI Lingma 通义灵码](https://lingma.aliyun.com/) （阿里 VSCode 插件）代码提示很不错 :tada:

## AI 工具

| 名称                                                                          | 价格/免费额度                     | 备注               |
| ----------------------------------------------------------------------------- | --------------------------------- | ------------------ |
| [Cursor](https://cursor.com/cn)                                               | **$20/月**                        | 最贵，最好用       |
| [Trae](https://trae.ai/) <Badge text="国际版" type="warning"/>                | 首月 **$3/月**，续订 **$10/月**。 | 仅首次登录需要翻墙 |
| [Trae CN](https://trae.ai/) <Badge text="国内版" type="tip"/>                 | 免费                              | 复杂功能用国际版   |
| [DeepSider](https://deepsider.ai/) <Badge text="免费" type="tip"/>            | **每天白嫖两次 Claude 4** 👍       | Chrome 插件        |
| [DeepSeek](https://chat.deepseek.com/) <Badge text="免费" type="tip"/>        | 日常提问足够用                    | 官网               |
| [Copilot](https://www.microsoft.com/zh-cn/microsoft-365/copilot/meet-copilot) | **$10/月** 或 **$100/年**         | VSCode 插件        |
   
## Cursor 对接 Mastergo MCP

1. 确保 `Cursor` 版本 `>= 0.46`
2. 登录 `mastergo` 官网，`个人设置` > `安全设置` > `生成令牌 token`
3. 登录 `Cursor`，点击右上角的个人头像，点击 `设置`
4. 点击 `Features`，勾选 `Enable auto-run mode`
5. 选择 `MCP`，点击 `Add new global MCP server`
6. 最开始提示没有配置文件，点击 `Create` 按钮，自动创建一个空的配置文件
7. 粘贴 `mastergo` 的 `MCP` 配置，网上的都不对，必须这么写，替换你的 `token`：

```json
{
    "mcpServers": {
        "mastergo-magic-mcp": {
            "command": "cmd",
            "args": [
                "/k",
                "npx",
                "-y",
                "@mastergo/magic-mcp",
                "--token=<YOUR TOKEN>",
                "--url=https://mastergo.com"
            ],
            "env": {}
        }
    }
}
```
8. 打开`cmd`，先全局安装： `npm i -g @mastergo/magic-mcp`
9. 返回`Cursor`，点击`右上角刷新按钮`，自动打开`cmd`对话框，不要关闭对话框
10. 在`mastergo`设计稿里，随便选择一个图层，复制`地址栏地址`，粘贴到 `Cursor` 的对话框中
11. `Cursor` 要选择 `Agent` 模式，让它生成`html`代码

## AI 提示语

#### 0）全局提示语

> 你是优秀的高级前端开发工程师。  
> Always respond in 中文。  
> 回复的代码，在关键代码前需要写中文注释。  
> 如果要根据图片生成前端代码，要严格还原图片中的界面，效果要一模一样。  
> 如果要生成 vue 代码，要使用 vue2 的语法。

#### 1）国际化当前文件

第一步提示语：

> 使用 vue-i18n 的语法，国际化当前文件。  
> 翻译成两种语言：英文和简体中文。  
> 提取当前文件中的所有中文，不包括注释。  
> 在提取中文的时候，如果中文在 data 中，需要在 computed 中新建同名的字段，返回国际化后的值，并注释掉 data 中的字段。  
> 创建对应的翻译键值对。  
> 在 src/locales/en.json 和 src/locales/zh-CN.json 文件中，新增一个字段，名称是当前文件名的小写，存放翻译键值对。

第二步提示语：

> 文件中还有很多中文没有国际化，请国际化剩余的中文文本，并更新相关文件。

#### 2）根据图片生成 vue 组件

> 根据图片中的界面，在当前文件中，使用 vue2 语法，编写一个 vue 组件。  
> 界面中的部分文字内容，使用变量替代，并在 data 中定义变量。  
> 样式使用 scss 语法。

#### 3）根据图片生成普通网页

> 在当前文件中，编写 html 和 css，还原图片中的界面。  
> css 要写在当前文件中。
