# 数字夫子

穿越千年，与古人智慧对话。

## 项目简介

「数字夫子」是一款以丝绸之路为主题的古典文化学习微信小程序，融合了传统文化与现代交互体验，为用户提供诗词鉴赏、典籍阅读、语音学习等多元化学习功能。

## 主要功能

### 核心模块

| 模块 | 说明 |
|------|------|
| 首页 | 丝绸之路主题展示，每日诗词推荐 |
| 典籍库 | 古典文献分类浏览与阅读 |
| 论坛 | 用户交流与问答社区 |
| 我的学习 | 阅读进度、统计数据与打卡营 |
| 设置 | 个人中心与偏好设置 |

### 趣味功能

- **配音小剧场** - 趣味配音，提升语言能力
- **看图猜诗** - 看图识别古诗词
- **丝路美食** - 探索丝绸之路沿线的美食文化
- **打卡营** - 每日打卡，养成阅读习惯

### 会员系统

提供月卡、季卡、年卡、永久会员多种等级，会员可享受专属权益。

## 技术架构

```
数字夫子微信小程序/
├── cloudfunctions/     # 云函数
│   ├── openVip/         # 开通VIP
│   ├── queryVipStatus/  # 查询VIP状态
│   ├── adminAddVip/     # 管理员添加VIP
│   ├── voiceEvaluate/   # 语音评测
│   └── textToSpeech/    # 文字转语音
├── pages/              # 页面文件
│   ├── home/           # 首页
│   ├── library/        # 典籍库
│   ├── forum/          # 论坛
│   ├── study/          # 学习中心
│   ├── settings/       # 设置
│   ├── secondary/      # 二级页面（个人中心、会员等）
│   └── feature/        # 功能页面（打卡营、配音等）
├── i18n/               # 国际化资源
├── images/             # 图片资源
└── utils/              # 工具函数
```

## 页面结构

**主包页面（TabBar）：**

- `pages/home/home` - 首页
- `pages/library/library` - 典籍库
- `pages/forum/forum` - 论坛
- `pages/study/study` - 我的学习
- `pages/settings/settings` - 设置

**分包页面（SubPackages）：**

- `pages/secondary/*` - 个人中心、会员、隐私、安全、帮助、关于等
- `pages/feature/*` - 打卡营、配音、诗词、美食等功能模块

## 云开发

项目使用微信云开发，包含以下云函数：

- `openVip` - VIP开通
- `queryVipStatus` - VIP状态查询
- `adminAddVip` - 管理员VIP管理
- `voiceEvaluate` - 语音评测
- `textToSpeech` - 文字转语音

## 国际化

支持简体中文（zh-CN）和繁体中文（zh-TW），配置文件位于 `i18n/base.json`。

## 开发环境

- 微信开发者工具
- 微信云开发环境

## 快速开始

1. 克隆项目到本地
2. 使用微信开发者工具导入项目
3. 开通云开发服务
4. 部署云函数
5. 配置数据库集合 `vip_users`
6. 运行项目

## 数据库配置

### vip_users 集合权限

```json
{
  "read": true,
  "create": true,
  "update": "doc._openid == auth.openid",
  "delete": false
}
```

## 相关文档

- [云函数使用指南](cloudfunctions/README.md)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/)
