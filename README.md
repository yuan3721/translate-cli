<div align="center">

# 🌐 有道翻译 CLI

**简单、快速、强大的命令行翻译工具**

基于有道翻译 API，让翻译触手可及

[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

</div>

---

## ✨ 功能特性

- 🚀 **极速翻译** - 命令行一键翻译，无需打开浏览器
- 🌍 **多语言支持** - 支持多种语言互译
- 🔐 **安全可靠** - 使用环境变量保护 API 密钥
- 📋 **便捷复制** - 翻译结果自动复制到剪贴板
- ⚡ **轻量高效** - 基于 Node.js，启动快速

## 📦 安装

### 前置要求

- Node.js >= 14.0.0
- pnpm（推荐）或 npm

### 快速开始

```bash
# 1. 克隆项目
git clone git@github.com:yuan3721/translate-cli.git
cd translate-cli

# 2. 安装依赖
pnpm install

# 3. 配置环境变量（见下方说明）
cp .env.example .env
# 编辑 .env 文件，填入你的 API 密钥

# 4. 全局安装（可选）
pnpm link
```

### 🔑 获取 API 密钥

1. 访问 [有道智云](https://ai.youdao.com/) 注册账号
2. 创建应用，选择「自然语言翻译」服务
3. 获取 **应用 ID (AppKey)** 和 **应用密钥 (AppSecret)**
4. 在项目根目录创建 `.env` 文件：

```env
YOUDAO_APP_KEY=your_app_key_here
YOUDAO_APP_SECRET=your_app_secret_here
```

> ⚠️ **注意**：`.env` 文件已添加到 `.gitignore`，请勿将其提交到版本控制系统

## 🚀 使用方法

### 基本用法

```bash
# 方式一：直接运行（开发模式）
node index.js "hello world"

# 方式二：全局命令（需先执行 pnpm link）
trans "hello world"
```

### 💡 使用示例

```bash
# 英译中（默认行为）
$ trans "hello world"
✅ hello world → 
 你好世界
✅ 已复制到剪贴板

# 翻译长句子
$ trans "The quick brown fox jumps over the lazy dog"
✅ The quick brown fox jumps over the lazy dog → 
 敏捷的棕色狐狸跳过懒狗
✅ 已复制到剪贴板

# 翻译中文
$ trans "你好，世界"
✅ 你好，世界 → 
 Hello, world
✅ 已复制到剪贴板

# 翻译包含特殊字符的文本
$ trans "What's your name?"
✅ What's your name? → 
 你叫什么名字？
✅ 已复制到剪贴板
```

## ⚙️ 配置说明

### 环境变量

在项目根目录的 `.env` 文件中配置：

| 变量名 | 说明 | 是否必填 | 示例 |
|--------|------|---------|------|
| `YOUDAO_APP_KEY` | 有道翻译应用 ID | ✅ 必填 | `your_app_key_here` |
| `YOUDAO_APP_SECRET` | 有道翻译应用密钥 | ✅ 必填 | `your_app_secret_here` |

## 🛠️ 开发指南

```bash
# 安装依赖
pnpm install

# 本地测试
node index.js "test translation"

# 链接到全局（方便测试）
pnpm link

# 取消全局链接
pnpm unlink --global
```

## 📚 技术栈

| 技术 | 说明 |
|------|------|
| **Node.js** | JavaScript 运行时环境 |
| **axios** | 优雅的 HTTP 客户端 |
| **dotenv** | 环境变量管理 |
| **crypto** | 加密和签名（Node.js 内置） |
| **clipboardy** | 跨平台剪贴板操作 |

## ❓ 常见问题

<details>
<summary><b>如何检查 API 密钥是否配置正确？</b></summary>

确保 `.env` 文件在项目根目录，且格式正确：
```bash
cat .env
```
应该看到类似输出：
```
YOUDAO_APP_KEY=your_key
YOUDAO_APP_SECRET=your_secret
```
</details>

<details>
<summary><b>翻译失败怎么办？</b></summary>

1. 检查网络连接
2. 确认 API 密钥是否有效
3. 查看有道智云账户是否有剩余调用次数
4. 检查输入文本是否包含特殊字符
</details>

<details>
<summary><b>如何卸载？</b></summary>

```bash
# 取消全局链接
pnpm unlink --global

# 删除项目目录
cd ..
rm -rf translate-cli
```
</details>

## 📄 License

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

Made with ❤️ by [Your Name]

</div>
