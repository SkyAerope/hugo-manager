# Hugo管理器


便捷地管理文章tag和分类（待开发）

## 如何使用
1. 安装 Node.js、pnpm：

2. 安装依赖：
   ```sh
   pnpm install
   ```

3. 安装 Electron 运行所需的系统依赖：
   ```sh
   sudo apt-get update
   sudo apt-get install -y libatk1.0-0t64 libgtk-3-0t64 libnss3 libxss1 libasound2t64 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libpango-1.0-0 libcups2t64 libatk-bridge2.0-0t64
   ```

4. 启动项目：
   ```sh
   pnpm start
   ```

> ⚠️ 注意：
> 该项目为 Electron 桌面应用，需在有图形界面的 Linux 环境下运行。
> 若在服务器或无桌面环境下运行，请配置 Xvfb 虚拟显示或使用 X11 转发。
