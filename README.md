# GitHub个人档案生成器

## 项目简介

GitHub个人档案生成器是一个基于Next.js开发的Web应用，它能够通过GitHub API获取用户的GitHub数据，并生成精美的个人档案页面。该应用展示用户的基本信息、仓库统计、编程语言分布以及热门仓库等信息。

这个项目是为了参加GitHub Developer Program而创建的，它展示了如何构建与GitHub集成的应用程序。

## 功能特点

- **GitHub OAuth登录**：使用GitHub账号安全登录
- **个人资料展示**：显示用户的GitHub个人资料信息
- **仓库统计**：展示用户的仓库数量、获得的星星数和分支数
- **编程语言分析**：通过饼图可视化展示用户使用的编程语言分布
- **热门仓库展示**：通过柱状图和列表展示用户最受欢迎的仓库

## 技术栈

- **前端框架**：React.js + Next.js 15
- **样式**：Tailwind CSS
- **数据可视化**：Chart.js + React-Chartjs-2
- **GitHub集成**：Octokit (GitHub REST API)
- **认证**：NextAuth.js (GitHub OAuth)
- **部署**：Netlify

## 开始使用

### 前提条件

- Node.js 18.17.0或更高版本
- npm 9.6.7或更高版本
- GitHub OAuth应用程序（用于认证）

### 安装步骤

1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/github-profile-generator.git
   cd github-profile-generator
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 创建`.env.local`文件并添加以下环境变量
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   ```

5. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 创建GitHub OAuth应用程序

1. 访问[GitHub Developer Settings](https://github.com/settings/developers)
2. 点击"New OAuth App"
3. 填写以下信息：
   - Application name: GitHub Profile Generator
   - Homepage URL: http://localhost:3000（开发环境）或您的部署URL
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github（开发环境）或您的部署URL/api/auth/callback/github
4. 注册应用程序后，您将获得Client ID和Client Secret，将它们添加到`.env.local`文件中

## 部署到Netlify

1. 在Netlify上创建一个新站点，并连接到您的GitHub仓库
2. 添加以下环境变量：
   - NEXTAUTH_URL: 您的Netlify域名（例如https://your-app-name.netlify.app）
   - NEXTAUTH_SECRET: 随机字符串，用于加密会话
   - GITHUB_ID: 您的GitHub OAuth应用程序Client ID
   - GITHUB_SECRET: 您的GitHub OAuth应用程序Client Secret
3. 更新GitHub OAuth应用程序的回调URL，将其指向您的Netlify域名/api/auth/callback/github

## 贡献指南

欢迎贡献！如果您想为这个项目做出贡献，请遵循以下步骤：

1. Fork这个仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个Pull Request

## 许可证

本项目采用MIT许可证 - 查看[LICENSE](LICENSE)文件了解详情

## 联系方式

如有任何问题或建议，请通过GitHub Issues与我们联系。

---

**注意**：这个应用程序仅请求读取用户公开信息的权限，不会请求对私有仓库的访问权限或任何写入权限。
