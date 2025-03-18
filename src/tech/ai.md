# Free AI

::: tip 前言
一顿操作猛如虎，人工智能来帮助
:::

## AI 问答

- [DeepSeek](https://chat.deepseek.com/)
- [百度 AI](https://chat.baidu.com/)
- [知乎直答](https://zhida.zhihu.com/)
- [Endless Chat](https://e11.free-chat.asia/)
- [Free2gpt](https://chat1.free2gpt.com/)

## AI 阅读

- [Kimi 会阅读文件的 AI 助手](https://kimi.moonshot.cn/)

## AI 导航

- [https://nav.free2gpt.com/](https://nav.free2gpt.com/)
- [https://ic.free-chat.asia/](https://ic.free-chat.asia/)

## AI 插件

- **TONGYI Lingma 通义灵码** （阿里 VSCode 插件）

## AI 编辑器

- [Trae 国际版](https://trae.ai/)

1. 登录使用 Github 账号，**需要翻墙**！！！
2. 登录成功后使用，不需要翻墙
3. **使用 Claude 3.7 有可能需要排队，再次尝试大概率不用排队**
4. Chat 模式，回复更快，需手动点击 `应用` 按钮，将改动应用于当前文件
5. 免费使用的模型：`Claude 3.7 & 3.5`、`DeepSeek R1 & V3`、`GPT-4o`

- [Trae 国内版](https://www.trae.com.cn/)

1. 免费使用的模型：`DeepSeek R1 & V3`、`Doubao 1.5 Pro`

- [Cursor](https://www.cursor.com/)

1. `gpt-4o-mini` or `cursor-small` 免费使用，其余高级模型**一共有 50 次免费使用次数！**

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
