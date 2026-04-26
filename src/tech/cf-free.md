# 免费帆樯

> edgetunnel 是一个基于 CF Workers/Pages 平台的边缘计算隧道解密方案。它能够高效地处理网络流量，并提供强大的管理面板和灵活的节点配置能力。每天 10 万次请求额度，早上 8 点更新。

## 1. 教程视频

<video src="https://asset.jasonbai.dpdns.org/temp/cf-free.mp4" controls width="100%"></video>

## 2. 完整思路

1. 注册免费域名，例如：`jack.dpdns.org`
2. 注册 Cloudflare 账号
3. 在 Cloudflare 中托管域名
4. 新建 Worker KV
5. 新建 Pages，上传压缩包并部署
6. 添加 环境变量 `ADMIN`，并设置密码
7. 绑定子域名，例如：`cf.jack.dpdns.org`
8. 绑定刚才的 KV
9. 重新上传压缩包，重新部署 Pages
10. 访问控制台：`https://cf.jack.dpdns.org/admin`
11. 复制订阅链接
12. 下载并安装 `V2Ray` 客户端，例如：`V2RayN`
13. 打开客户端，按 `Ctrl + V`，导入订阅链接
14. 选择 `订阅分组` > `更新全部订阅（不通过代理）`，拿到优选节点
15. `Ctrl + A` 全选节点，`Ctrl + R`，测试所有节点真实速度
16. 按 `Enter` 键，选择一个有速度的节点
17. 在最下方选择 `自动配置系统代理`，就翻出去了
18. 打开 [https://ipcheck.ing](https://ipcheck.ing)，查看自己 IP 所在的地区

## 3. 详细教程

- [零度教程](https://www.freedidi.com/23618.html)
- [官方教程](https://blog.cmliussss.com/p/edt2/)
- [代码仓库](https://github.com/cmliu/edgetunnel)

## 4. 使用教程

由于完整配置太麻烦，**可以从第 11 步开始！**

- 首先，看一遍视频教程，了解基本操作
- 然后，根据自己的系统，下载并安装客户端，例如：`V2RayN`
- 复制下方的自适应订阅链接，打开客户端，按 `Ctrl + V`，导入订阅链接
- 选择 `订阅分组` > `更新全部订阅（不通过代理）`，拿到优选节点
- 按 `Ctrl + A` 全选节点，`Ctrl + R`，测试所有节点真实速度
- 按 `Enter` 键，选择一个有速度的节点
- 在最下方选择 `自动配置系统代理`，开始翻墙
- 在最下方选择 `清除系统代理`，结束翻墙

### 订阅地址

1. 自适应订阅：联系我获取
2. Clash 订阅：联系我获取

### 下载客户端

| 平台        | 推荐客户端                                                                                                                                                                                                              | 备注               |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- |
| **Windows** | [v2rayN](https://v2rayn.2dust.link), [FlClash](https://github.com/chen08209/FlClash), [mihomo-party](https://github.com/mihomo-party-org/mihomo-party), [Clash Verge Rev](https://github.com/ClashVerge/ClashVerge-Rev) | 全面支持           |
| **Android** | [ClashMetaForAndroid](https://github.com/MetaCubeX/ClashMetaForAndroid), [FlClash](https://github.com/chen08209/FlClash), [v2rayNG](https://github.com/2dust/v2rayNG)                                                   | 建议使用 Meta 核心 |
| **iOS**     | [Surge](https://surgeapp.com/), [Shadowrocket](https://shadowrocket.com/), [Stash](https://stashapp.com/)                                                                                                               | 完美适配           |
| **MacOS**   | [FlClash](https://github.com/chen08209/FlClash), [mihomo-party](https://github.com/mihomo-party-org/mihomo-party), [Clash Verge Rev](https://github.com/ClashVerge/ClashVerge-Rev), [Surge](https://surgeapp.com/)      | M1/M2 完美兼容     |

### 软件界面

![软件界面](/tech/v2rayn.png)
