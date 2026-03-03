# 🏠 Mini Home - 家庭网络仪表板

<p align="center">
  <img src="homepage.png" alt="Mini Home 预览" width="800">
</p>

<p align="center">
  <a href="#功能特点">功能特点</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#配置说明">配置说明</a> •
  <a href="#项目结构">项目结构</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
</p>

---

## ✨ 功能特点

### 🎨 优雅的界面设计
- **玻璃拟态效果** - 现代化的半透明卡片设计
- **响应式布局** - 完美适配桌面和移动设备
- **深色/浅色主题** - 一键切换，自动跟随系统
- **流畅动画** - 精心设计的悬停和过渡效果

### 🚀 快速访问
- **网络设备** - 光猫、软路由、NAS、工作站等
- **Docker 应用** - Portainer、Home Assistant、Sonarr 等
- **NAS 应用** - Plex、WordPress 等服务
- **常用网址** - AI 工具、娱乐、知识、设计工具分类

### 🔒 安全可靠
- 密码保护登录
- 环境变量配置敏感信息
- Session 级别的身份验证

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **前端框架** | React 19 + TypeScript |
| **构建工具** | Vite 7 |
| **样式框架** | Tailwind CSS 3 |
| **UI 组件** | shadcn/ui |
| **图标库** | Lucide React |
| **路由** | React Router 7 |

---

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 9+

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/Panicheartan/Mini-home.git
cd Mini-home/app
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
cp .env.example .env
# 编辑 .env 文件，设置登录密码
VITE_DASHBOARD_PASSWORD=your-secure-password
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问应用**
打开浏览器访问 `http://localhost:8080`

---

## ⚙️ 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_DASHBOARD_PASSWORD` | 登录密码 | 无（必须设置） |

### 自定义服务

编辑 `src/App.tsx` 文件，修改以下数组来自定义你的服务：

```typescript
// 网络设备
const networkDevices = [
  { name: '光猫', address: '192.168.1.1', description: '光纤调制解调器', icon: Router, color: 'from-blue-500 to-blue-600', href: 'http://192.168.1.1' },
  // ...
];

// Docker 应用
const dockerApps = [
  { name: 'Portainer', address: '192.168.1.6:9000', description: 'Docker可视化管理', icon: Container, color: 'from-cyan-500 to-cyan-600', href: 'http://192.168.1.6:9000' },
  // ...
];
```

### 常用网址

编辑 `src/data/websites.ts` 文件来添加或修改常用网址分类。

---

## 📁 项目结构

```
Mini-home/
├── app/
│   ├── src/
│   │   ├── components/      # UI 组件
│   │   │   ├── ui/         # shadcn/ui 组件
│   │   │   ├── LoginPage.tsx
│   │   │   ├── WebsitesPage.tsx
│   │   │   └── ...
│   │   ├── contexts/        # React Context
│   │   │   ├── AuthContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── data/            # 静态数据
│   │   ├── types/           # TypeScript 类型定义
│   │   ├── lib/             # 工具函数
│   │   ├── App.tsx          # 主应用组件
│   │   └── main.tsx         # 入口文件
│   ├── .env                 # 环境变量（需创建）
│   ├── .env.example         # 环境变量示例
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── .github/                 # GitHub Actions 工作流
├── homepage.png             # 项目预览图
└── README.md
```

---

## 🔧 构建部署

### 生产构建
```bash
npm run build
```

构建输出位于 `dist/` 目录。

### Docker 部署
```bash
# 构建镜像
docker build -t mini-home .

# 运行容器
docker run -d -p 80:80 mini-home
```

### NAS 部署
项目包含 GitHub Actions 工作流，可自动部署到 NAS：
1. 配置 `NAS_HOST` 和 `NAS_SSH_KEY` 密钥
2. 推送代码到 `master` 分支自动触发部署

---

## 🎯 优化亮点

### 代码优化
- ✅ **类型安全** - 统一的 TypeScript 类型定义
- ✅ **代码复用** - 提取共享工具函数
- ✅ **性能优化** - Fisher-Yates 洗牌算法
- ✅ **环境变量** - 安全存储敏感配置

### UI/UX 优化
- ✅ **玻璃拟态** - 现代化的视觉设计
- ✅ **响应式布局** - 适配各种屏幕尺寸
- ✅ **交互动画** - 流畅的悬停和过渡效果
- ✅ **主题切换** - 支持深色/浅色模式

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

---

## 📝 更新日志

### 2025-03-01
- ✨ 优化代码结构和界面设计
- 🔒 使用环境变量存储密码
- 🎨 添加玻璃拟态效果
- 📐 改进内容分布和网格布局
- ⚡ 优化随机排序算法

### 2025-02-28
- 📱 优化移动端显示
- 🖥️ Mac Studio 改用局域网 IP
- 🔑 移除登录页密码提示

---

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Panicheartan">Panicheartan</a>
</p>
