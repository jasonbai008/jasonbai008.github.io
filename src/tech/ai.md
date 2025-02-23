# Free AI

::: tip 前言
一顿操作猛如虎，人工智能来帮助
:::

## AI 问答

- [https://chat.deepseek.com/](https://chat.deepseek.com/)
- [https://e9.free-chat.asia/](https://e10.free-chat.asia/)
- [https://chat1.free2gpt.com/](https://chat1.free2gpt.com/)
- [https://5dhfty.aitianhu1.top/#/chat/1002](https://5dhfty.aitianhu1.top/#/chat/1002)

## AI 阅读

- [Kimi 会阅读文件的 AI 助手](https://kimi.moonshot.cn/)

## AI 导航

- [https://nav.free2gpt.com/](https://nav.free2gpt.com/)
- [https://ic.free-chat.asia/](https://ic.free-chat.asia/)

## AI 插件

- **TONGYI Lingma 通义灵码** （优秀的VSCode插件）

## AI 编辑器

- [Cursor](https://www.cursor.com/) （一款智能代码编辑器）

1. `Tab` 代码补全
2. `Ctrl + K` 在当前代码块儿调用 AI 助手
3. `Ctrl + L` 打开 Chat 对话框，**可上传截屏图片，生成粗略的前端代码**
4. `Ctrl + I` 打开 Composer 对话框，**可上传截屏图片，生成粗略的前端代码**
5. `gpt-4o-mini` or `cursor-small` 免费试用200次，其余高级模型**一共有 50 次免费使用次数！**
6. 只有高级模型比如 **claude 3.5 能新建编辑文件**，免费模型不能操纵你的文件！
7. 设置全局提示语（示例）
   > 你是优秀的高级前端开发工程师。  
   > Always respond in 中文。  
   > 回复的代码，在关键代码前需要写中文注释。  
   > 如果要根据图片生成前端代码，要严格还原图片中的界面，效果要一模一样。  
   > 如果要生成 vue 代码，要使用 vue2 的语法。

### 更新机器码，无限使用Cursor

1. 可以使用临时邮箱注册多个Cursor账号
2. 电脑上使用3个账号后，就会提示：**免费试用帐户过多。**
3. 只能重置设备ID

- **Windows用户：**以管理员身份运行PowerShell
```sh
irm https://raw.githubusercontent.com/yuaotian/go-cursor-help/master/scripts/install.ps1 | iex
```

- **MacOS用户：**
```sh
curl -fsSL https://raw.githubusercontent.com/yuaotian/go-cursor-help/master/scripts/install.sh | sudo bash
```

### 使用示例 Claude 3.5

#### 1）国际化当前文件
   
第一步提示语：
> 使用vue-i18n的语法，国际化当前文件。  
> 翻译成两种语言：英文和简体中文。  
> 提取当前文件中的所有中文，不包括注释。  
> 在提取中文的时候，如果中文在data中，需要在computed中新建同名的字段，返回国际化后的值，并注释掉data中的字段。  
> 创建对应的翻译键值对。  
> 在src/locales/en.json 和 src/locales/zh-CN.json文件中，新增一个字段，名称是当前文件名的小写，存放翻译键值对。

第二步提示语：
> 文件中还有很多中文没有国际化，请国际化剩余的中文文本，并更新相关文件。

#### 2）根据图片生成vue组件
   
> 根据图片中的界面，在当前文件中，使用vue2语法，编写一个vue组件。  
> 界面中的部分文字内容，使用变量替代，并在data中定义变量。  
> 样式使用scss语法。  

#### 3）根据图片生成普通网页
   
> 在当前文件中，编写html和css，还原图片中的界面。  
> css要写在当前文件中。  