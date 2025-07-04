# Free AI

::: tip 前言
付费上班的时代：上班为完成超额工作需要助手，助手需要付费，已闭环！
:::

## AI 问答

- [DeepSeek 官网](https://chat.deepseek.com/)
- [DeepSeek:R1 0528 (free)](https://openrouter.ai/chat?models=deepseek/deepseek-r1-0528:free)（50次免费请求/天）
- [豆包](https://www.doubao.com/chat)
- [Endless Chat](https://e11.free-chat.asia/)
- [Free2gpt](https://chat1.free2gpt.com/)

## AI 阅读

- [Kimi 会阅读文件的 AI 助手](https://kimi.moonshot.cn/)

## AI 导航

- [nav.free2gpt.com](https://nav.free2gpt.com/)
- [ic.free-chat.asia](https://ic.free-chat.asia/)

## AI 社区

- [huggingface.co](https://huggingface.co)（需要翻墙）
- [openrouter.ai](https://openrouter.ai/models)

## AI 插件

- **TONGYI Lingma 通义灵码** （阿里 VSCode 插件）

## AI 工具

| 名称                                                                                          | 价格/免费额度                         | 备注               |
| --------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------ |
| [Cursor](https://www.cursor.com/)                                                             | $20/月                                | 最贵，最好用         |
| [Trae 国际版](https://trae.ai/)                                                               | 首月 $3/月，续订 $10/月。包年 $7.5/月 | 仅首次登录需要翻墙 |
| [Copilot](https://docs.github.com/zh/copilot)                                                 | $10/月 或 $100/年                     | VSCode 插件        |
| [Augment](https://www.augmentcode.com/)                                                       | 用几次就被封了。。。                  | VSCode 插件        |
| [DeepSider](chrome-extension://dfbnddndcmilnhdfmmaolepiaefacnpo/newtab.html#/settings/reward) | 每天5次免费请求，偶尔用不了。。。     | 谷歌浏览器插件     |
| [DeepSeek](https://chat.deepseek.com/)                                                        | 免费用                                | 网页版             |
| [OpenRouter](https://openrouter.ai/models)                                                    | 每天50次免费模型的请求                | 网页版             |
| [v0.dev](https://v0.dev/)                                                                     | 每月5美元免费额度，够250次请求        | 网页版             |

- Cursor 最好用
- Trae 国际版 最实惠
- DeepSider 每天可以白嫖5次 Claude 4
- v0 每个月可以白嫖 250次上传图片生成页面的功能
- OpenRouter 每天白嫖50次免费模型（比如 DeepSeek 0528）的请求
   
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
