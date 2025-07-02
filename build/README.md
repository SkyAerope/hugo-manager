# 应用图标文件

请将您的应用图标文件放在这个目录中：

## 必需文件
- `icon.png` - 主图标文件 (512x512像素，PNG格式)
- `icon.ico` - Windows图标文件 (256x256像素，ICO格式)

## MSIX专用图标（可选）
- `StoreLogo.png` - 商店徽标 (50x50像素)
- `Square44x44Logo.png` - 小磁贴 (44x44像素)  
- `Square150x150Logo.png` - 中等磁贴 (150x150像素)
- `Square310x310Logo.png` - 大磁贴 (310x310像素)
- `Wide310x150Logo.png` - 宽磁贴 (310x150像素)

## 图标制作建议
1. 使用透明背景
2. 简洁明了的设计
3. 在小尺寸下仍然清晰可见
4. 符合Windows应用设计规范

## 在线工具推荐
- Favicon Generator: https://favicon.io/
- App Icon Generator: https://appicon.co/
- Canva: https://www.canva.com/

放置图标文件后，electron-builder会自动处理并应用到MSIX包中。
