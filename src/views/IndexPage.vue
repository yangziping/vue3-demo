<template>
  <div class="index-page">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="logo">系统首页</div>
      <div class="user-info">
        <span class="username">{{ username }}</span>
        <button @click="handleLogout" class="logout-btn">退出          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="mr-1">
          <path d="M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-5.5 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5  .5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5z"/>
          <path d="M11 13a1 1 0 1 0 0 2h-1a1 1 0 1 0 0-2h1zm0-11a1 1 0 1 0 0 2h-1a1 1 0 1 0 0-2h1z"/>
          <path d="M8 12a4 4 0 0 1-4-4V3H1l3.89-3.89A.5.5 0 0 1 4.5 0h6a.5.5 0 0 1 .5.5L11 3v5a4 4 0 0 1-4 4z"/>
        </svg>
          退出登录
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="welcome-card">
        <h2>欢迎回来，{{ username }}！</h2>
        <p class="login-time">登录时间：{{ loginTime }}</p>
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">12</div>
            <div class="stat-label">待办任务</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">3</div>
            <div class="stat-label">新消息</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">98%</div>
            <div class="stat-label">系统可用率</div>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2024 系统名称 - 版权所有</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';  // 引入路由

// 路由实例
const router = useRouter();

// 用户名（实际项目中可从登录状态/接口获取）
const username = ref('');

// 登录时间
const loginTime = ref('');

// 退出登录
const handleLogout = () => {
  // 清除登录状态（如 localStorage）
  localStorage.removeItem('userInfo');
  // 跳回登录页
  router.push('/login');
};

onMounted(() => {
  // 从本地存储获取登录信息（登录时应保存）
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  if (userInfo.username) {
    username.value = userInfo.username;
  } else {
    // 若未登录，强制跳回登录页
    router.push('/login');
  }

  // 格式化当前登录时间
  const now = new Date();
  loginTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
});
</script>

<style scoped>
.index-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

/* 导航栏 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3b82f6;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.username {
  color: #4b5563;
  font-weight: 500;
}

.logout-btn {
  display: flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  background-color: #eff6ff;
  color: #3b82f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: #dbeafe;
}

/* 主内容区 */
.main-content {
  flex: 1;
  padding: 2rem;
  /*max-width: 1200px;*/
  margin: 0 auto;
  width: 100%;
}

.welcome-card {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.welcome-card h2 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.login-time {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: #f8fafc;
  padding: 1.2rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
}

/* 页脚 */
.footer {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.85rem;
  border-top: 1px solid #e2e8f0;
}
</style>
