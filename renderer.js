const { ipcRenderer } = require('electron');

// 保存仓库路径到本地存储
function saveRepoPath(path) {
  localStorage.setItem('hugoRepoPath', path);
}

// 获取保存的仓库路径
function getRepoPath() {
  return localStorage.getItem('hugoRepoPath') || '';
}

// 选择仓库路径
async function browseRepoPath() {
  try {
    const result = await ipcRenderer.invoke('open-directory-dialog');
    if (result.canceled) return null;
    if (result.filePaths.length > 0) {
      const path = result.filePaths[0];
      document.getElementById('repo-path').value = path;
      saveRepoPath(path);
      return path;
    }
  } catch (error) {
    console.error('选择目录失败:', error);
  }
  return null;
}

// 从仓库加载文章
async function loadArticlesFromRepo() {
  const repoPath = document.getElementById('repo-path').value;
  if (!repoPath) {
    alert('请先选择 Hugo 内容目录路径');
    return null;
  }
  
  try {
    const posts = await ipcRenderer.invoke('load-posts', repoPath);
    return posts;
  } catch (error) {
    console.error('加载文章失败:', error);
    alert(`加载文章失败: ${error.message}`);
    return null;
  }
}

// 保存文章到仓库
async function saveArticlesToRepo(articles) {
  const repoPath = document.getElementById('repo-path').value;
  if (!repoPath) {
    alert('请先选择 Hugo 内容目录路径');
    return false;
  }
  
  try {
    await ipcRenderer.invoke('save-posts', articles, repoPath);
    return true;
  } catch (error) {
    console.error('保存文章失败:', error);
    alert(`保存文章失败: ${error.message}`);
    return false;
  }
}

// 导出函数供 HTML 调用
window.hugoManager = {
  browseRepoPath,
  loadArticlesFromRepo,
  saveArticlesToRepo,
  getRepoPath
};
