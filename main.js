// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// 打开目录选择对话框
ipcMain.handle('open-directory-dialog', async () => {
  return dialog.showOpenDialog({
    properties: ['openDirectory']
  });
});

// 递归获取目录下所有 Markdown 文件
function getAllMarkdownFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      // 如果是目录，递归获取子目录中的文件
      getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      // 如果是 .md 文件，添加到文件列表
      arrayOfFiles.push(fullPath);
    }
  });
  
  return arrayOfFiles;
}

ipcMain.handle('load-posts', async (_, dirPath) => {
  try {
    const markdownFiles = getAllMarkdownFiles(dirPath);
    
    return markdownFiles.map(filePath => {
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(raw);
      // 获取相对路径作为文件名，这样保存时可以正确定位文件
      const relativePath = path.relative(dirPath, filePath);
      
      return {
        filename: relativePath,
        title: parsed.data.title || path.basename(filePath, '.md'),
        tags: parsed.data.tags || [],
        content: parsed.content
      };
    });
  } catch (error) {
    console.error('读取文章错误:', error);
    throw error;
  }
});

ipcMain.handle('save-posts', async (_, posts, dirPath) => {
  try {
    posts.forEach(post => {
      const filePath = path.join(dirPath, post.filename);
      // 确保目标目录存在
      const fileDir = path.dirname(filePath);
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }
      
      // 读取原始文件以获取完整的 front matter
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const originalParsed = matter(originalContent);
      
      // 只更新标签，保留其他 front matter
      const frontMatter = {
        ...originalParsed.data,
        tags: post.tags
      };
      
      const raw = matter.stringify(post.content, frontMatter);
      fs.writeFileSync(filePath, raw, 'utf8');
    });
    return 'OK';
  } catch (error) {
    console.error('保存文章错误:', error);
    throw error;
  }
});
