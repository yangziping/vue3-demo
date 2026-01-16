<template>
  <div class="notfound">
    <el-result icon="warning" title="404" sub-title="页面不存在">
      <template #extra>
        <el-space>
          <el-button type="primary" @click="goHome">返回首页</el-button>
          <el-button @click="goLogin">返回登录</el-button>
        </el-space>
      </template>
    </el-result>
  </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  defineOptions({ name: 'NotFoundPage' })
  const router = useRouter()
  const goHome = () => {
    const isAuthenticated = localStorage.getItem('isLogin') === 'true'
    router.push(isAuthenticated ? '/dashboard' : '/login')
  }
  const goLogin = () => {
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .notfound {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  </style>
