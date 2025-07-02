#!/bin/bash

# 图标生成脚本
# 需要 ImageMagick 工具: sudo apt install imagemagick 或 brew install imagemagick
# 如果使用 SVG 文件，需要安装 librsvg: sudo apt install librsvg2-bin

if [ $# -eq 0 ]; then
    echo "用法: $0 <source-icon.(png|svg)>"
    echo "示例: $0 my-icon.png"
    exit 1
fi

SOURCE_ICON="$1"

if [ ! -f "$SOURCE_ICON" ]; then
    echo "错误: 找不到源图标文件 $SOURCE_ICON"
    exit 1
fi

# 检查文件类型
EXTENSION="${SOURCE_ICON##*.}"
if [ "$EXTENSION" == "svg" ]; then
    echo "检测到 SVG 文件，转换为 PNG 格式..."
    TEMP_PNG="temp-icon.png"
    rsvg-convert -w 512 -h 512 "$SOURCE_ICON" -o "$TEMP_PNG"
    SOURCE_ICON="$TEMP_PNG"
fi

echo "从 $SOURCE_ICON 生成各种尺寸的图标..."

# 创建目录
mkdir -p build
mkdir -p build/appx

# 生成主图标
convert "$SOURCE_ICON" -resize 512x512 build/icon.png
convert "$SOURCE_ICON" -resize 256x256 build/icon.ico

# 生成 MSIX 专用图标
convert "$SOURCE_ICON" -resize 50x50 build/appx/StoreLogo.png
convert "$SOURCE_ICON" -resize 44x44 build/appx/Square44x44Logo.png
convert "$SOURCE_ICON" -resize 150x150 build/appx/Square150x150Logo.png
convert "$SOURCE_ICON" -resize 310x310 build/appx/Square310x310Logo.png
convert "$SOURCE_ICON" -resize 310x150 build/appx/Wide310x150Logo.png
convert "$SOURCE_ICON" -resize 620x300 build/appx/SplashScreen.png

# 删除临时文件
if [ -f "$TEMP_PNG" ]; then
    rm "$TEMP_PNG"
fi

echo "图标生成完成！"
echo "生成的文件："
find build -name "*.png" -o -name "*.ico" | sort