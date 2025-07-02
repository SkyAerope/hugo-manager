# MSIX 专用图标资源

这个目录用于存放 MSIX/AppX 包的专用图标资源。

## 支持的图标文件：

### 必需图标
- `StoreLogo.png` - 商店徽标 (50x50 像素)
- `Square44x44Logo.png` - 小磁贴和任务栏 (44x44 像素)
- `Square150x150Logo.png` - 中等磁贴 (150x150 像素)

### 可选图标
- `Square310x310Logo.png` - 大磁贴 (310x310 像素)
- `Wide310x150Logo.png` - 宽磁贴 (310x150 像素)
- `SplashScreen.png` - 启动画面 (620x300 像素)

## 注意事项：
1. 所有图标必须是 PNG 格式
2. 建议使用透明背景
3. 图标设计应符合 Windows 应用规范
4. 如果不提供这些文件，electron-builder 会使用主图标自动生成

## 图标用途：
- **StoreLogo**: 显示在 Microsoft Store 中
- **Square44x44Logo**: 任务栏、通知区域
- **Square150x150Logo**: 开始菜单中等磁贴
- **Square310x310Logo**: 开始菜单大磁贴
- **Wide310x150Logo**: 开始菜单宽磁贴
- **SplashScreen**: 应用启动时的启动画面
