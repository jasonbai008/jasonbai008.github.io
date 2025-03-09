# 白嫖 Cursor

::: tip 前言
白嫖怪来了...
:::

## 1. Cursor VIP

**通过命令行下载已开通VIP的Cursor版本，目前可以免费使用15天！**

1. 打开官网：[https://cursor.jeter.eu.org/](https://cursor.jeter.eu.org/)，点击下方按钮
2. 复制弹窗里的命令，一个是从Github下载，**一个是从Gitee下载**，推荐后者
3. Mac/Linux用户 通过**终端执行**；Windows用户 通过**git bash 执行**刚才复制的命令
4. 根据执行结果**最后面的提示**，还得复制命令，使用**管理员打开CMD执行下载安装证书的命令**，相关链接：[https://gitee.com/kingparks/cursor-vip/blob/main/docs/proxyMode_CN.md](https://gitee.com/kingparks/cursor-vip/blob/main/docs/proxyMode_CN.md)
5. 关闭命令行窗口
6. 桌面上会出现一个**Cursor VIP的黑色方块儿图标**，双击打开等不到一分钟，就可以打开VIP版本的Cursor了
7. 15天后，可能需要重新卸载再执行一遍以上步骤吧。

**大致步骤：**

1. 从Gitee下载并安装cursor-vip
```sh
# Mac/Linux 通过终端执行：
# Windows 通过 git bash 执行：
bash <(curl -Lk https://gitee.com/kingparks/cursor-vip/releases/download/latest/ic.sh) 3570489862074a048a655c645d65cc31
```

2. 下载并安装证书
```sh
# 管理员通过 git bash 执行：
certutil -addstore root ~/.cursor-vip/ca-cert.cer

# 或者，管理员通过 cmd 执行：
certutil -addstore root %USERPROFILE%\.cursor-vip\ca-cert.cer
```

## 2. 重置机器码&临时邮箱【已失效】

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