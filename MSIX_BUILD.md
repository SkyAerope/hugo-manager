# Hugo Manager MSIX 构建

这个项目使用 GitHub Actions 自动构建 MSIX 包。

## 如何使用

### 自动构建（推荐）

1. 创建并推送一个版本标签：
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. GitHub Actions 会自动：
   - 在 Windows 环境中构建 MSIX 包
   - 将 MSIX 文件上传为 artifact
   - 创建 GitHub Release 并附加 MSIX 文件

### 手动触发

在 GitHub 仓库的 Actions 页面，选择 "Build MSIX Package" 工作流，然后点击 "Run workflow"。

## 构建输出

- **Artifact**: 每次构建都会生成一个名为 `hugo-manager-msix` 的 artifact，保存 30 天
- **Release**: 当推送 tag 时，会自动创建 GitHub Release 并附加 MSIX 文件

## 配置说明

- `electron-builder.json`: electron-builder 配置，专门用于 MSIX 构建
- `.github/workflows/build.yml`: GitHub Actions 工作流配置
- 构建只在 Windows 环境中进行，确保 MSIX 包的兼容性

## 图标配置

### 添加应用图标

1. **创建图标目录**：
   ```bash
   mkdir build
   ```

2. **准备图标文件**（推荐格式和尺寸）：
   - `icon.png` - 主图标文件 (512x512 像素)
   - `icon.ico` - Windows 图标文件 (256x256 像素)

3. **MSIX 专用图标**（可选，用于更好的 Windows 集成）：
   - `StoreLogo.png` - 商店徽标 (50x50 像素)
   - `Square44x44Logo.png` - 小磁贴 (44x44 像素)
   - `Square150x150Logo.png` - 中等磁贴 (150x150 像素)
   - `Square310x310Logo.png` - 大磁贴 (310x310 像素)
   - `Wide310x150Logo.png` - 宽磁贴 (310x150 像素)

### 图标文件位置

```
hugo-manager/
├── build/
│   ├── icon.png          # 主图标
│   ├── icon.ico          # Windows 图标
│   ├── StoreLogo.png     # 商店徽标
│   ├── Square44x44Logo.png
│   ├── Square150x150Logo.png
│   ├── Square310x310Logo.png
│   └── Wide310x150Logo.png
└── ...
```

### 图标要求
- **格式**: PNG 或 ICO
- **透明背景**: 推荐使用透明背景
- **高质量**: 使用矢量图或高分辨率位图
- **设计**: 遵循 Windows 应用图标设计指南

### 在线图标工具
- **Favicon Generator**: https://favicon.io/
- **App Icon Generator**: https://appicon.co/
- **Canva**: https://www.canva.com/ (设计自定义图标)

### 自动配置
当您在 `build/` 目录中放置 `icon.png` 或 `icon.ico` 文件后，electron-builder 会自动：
- 生成所需的各种尺寸
- 应用到 MSIX 包中
- 在 Windows 中显示正确的图标

## 版本管理

每次发布新版本时：
1. 更新 `package.json` 中的版本号
2. 提交更改
3. 创建对应的 git tag
4. 推送 tag 触发自动构建
