<template>
  <div class="login-page">
    <!-- 背景装饰 -->
<!--    <div class="bg-gradient-to-br from-blue-50 to-indigo-100 absolute inset-0 z-0"></div>-->

    <!-- 登录卡片（居中显示） -->
    <div class="login-card">
      <!-- 标题区域 -->
      <div class="text-center mb-8">
        <h1 class="text-[clamp(1.8rem,5vw,2.5rem)] font-bold text-gray-800 mb-2">欢迎登录</h1>
        <p class="text-gray-500">请输入账号密码访问系统</p>
      </div>

      <!-- 表单区域 -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- 用户名输入 -->
        <div class="form-group">
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </span>
            <input
              type="text"
              id="username"
              v-model="form.username"
              placeholder="请输入用户名"
              class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        <!-- 密码输入 -->
        <div class="form-group">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                />
              </svg>
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              placeholder="请输入密码"
              class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                t="1761925033697"
                v-if="!showPassword"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3355"
                width="18"
                height="18"
              >
                <path
                  d="M512 608a96 96 0 1 1 0-192 96 96 0 0 1 0 192m0-256c-88.224 0-160 71.776-160 160s71.776 160 160 160 160-71.776 160-160-71.776-160-160-160"
                  fill="#000000"
                  p-id="3356"
                ></path>
                <path
                  d="M512 800c-212.064 0-384-256-384-288s171.936-288 384-288 384 256 384 288-171.936 288-384 288m0-640C265.248 160 64 443.008 64 512c0 68.992 201.248 352 448 352s448-283.008 448-352c0-68.992-201.248-352-448-352"
                  fill="#000000"
                  p-id="3357"
                ></path>
              </svg>
              <svg
                t="1761925070711"
                v-if="showPassword"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3511"
                width="18"
                height="18"
              >
                <path
                  d="M512 800c-66.112 0-128.32-24.896-182.656-60.096l94.976-94.976A156.256 156.256 0 0 0 512 672c88.224 0 160-71.776 160-160a156.256 156.256 0 0 0-27.072-87.68l101.536-101.536C837.28 398.624 896 493.344 896 512c0 32-171.936 288-384 288m96-288a96 96 0 0 1-96 96c-14.784 0-28.64-3.616-41.088-9.664l127.424-127.424c6.048 12.448 9.664 26.304 9.664 41.088M128 512c0-32 171.936-288 384-288 66.112 0 128.32 24.896 182.656 60.096L277.536 701.216C186.72 625.376 128 530.656 128 512m664.064-234.816l91.328-91.328-45.248-45.248-97.632 97.632C673.472 192.704 595.456 160 512 160 265.248 160 64 443.008 64 512c0 39.392 65.728 148.416 167.936 234.816l-91.328 91.328 45.248 45.248 97.632-97.632C350.528 831.296 428.544 864 512 864c246.752 0 448-283.008 448-352 0-39.392-65.728-148.416-167.936-234.816"
                  fill="#000000"
                  p-id="3512"
                ></path>
                <path
                  d="M512 352c-88.224 0-160 71.776-160 160 0 15.328 2.848 29.856 6.88 43.872l58.592-58.592a95.616 95.616 0 0 1 79.808-79.808l58.592-58.592A157.76 157.76 0 0 0 512 352"
                  fill="#000000"
                  p-id="3513"
                ></path>
              </svg>

              <!--              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" v-if="!showPassword">-->
              <!--                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>-->
              <!--                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>-->
              <!--              </svg>-->

              <!--              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" v-else>-->
              <!--                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5c1.096 0 2.229-.193 3.359-.562l1.428 1.427a.5.5 0 0 0 .708-.708L13.359 11.238zM8 14s-1.573-2.695-4-8 2.427-8 4-8 4 5.305 4 8-2.427 8-4 8z"/>-->
              <!--              </svg>-->
            </button>
          </div>
        </div>

        <!-- 记住密码 & 忘记密码 -->
        <div class="flex items-center justify-between">
          <label class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="form.remember"
              class="w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-600">记住我</span>
          </label>
          <a href="#" class="text-sm text-blue-500 hover:text-blue-600 transition-colors"
            >忘记密码？</a
          >
        </div>

        <!-- 登录按钮 -->
        <button
          type="submit"
          class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-200/50"
        >
          登录
        </button>
      </form>

      <!-- 其他登录方式 -->
      <div class="mt-8">
        <div class="relative flex items-center justify-center">
          <div class="h-px bg-gray-300 w-full"></div>
          <span class="absolute bg-white px-3 text-sm text-gray-500">其他登录方式</span>
        </div>
        <div class="flex justify-center space-x-4 mt-4">
          <button
            class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
              />
            </svg>
          </button>
          <!--          <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
            </svg>
          </button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import router from '@/router'
import { RouterView, useRouter } from 'vue-router'
const router = useRouter()

// 表单数据
const form = ref({
  username: '',
  password: '',
  remember: false,
})

// 密码显示切换
const showPassword = ref(false)

// 登录处理
const handleLogin = () => {
  console.log('登录数据:', form.value)
  if (form.value.password && form.value.password) {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        username: form.value.username,
        loginTime: new Date().toISOString(),
      }),
    )
    router.push('/indexPage')
  } else {
    alert('请输入用户名密码')
  }
}
</script>

<style scoped>
/* 关键修改：确保背景图完全适配视口，不超出 */
.login-page {
  min-height: 100vh;
  height: 100vh; /* 强制容器高度 = 视口高度，不允许被图片撑开 */
  width: 100vw; /* 强制容器宽度 = 视口宽度，避免横向滚动 */
  display: flex;
  justify-content: center;
  align-items: center;
  //padding: 20px;
  margin: 0; /* 清除默认margin，避免额外空间 */
  overflow: hidden; /* 隐藏任何超出容器的内容（包括背景图边缘） */
  background-size: 100% auto;
  /* 背景图优化：优先保证垂直方向不超出，同时覆盖主要视觉区域 */
  background-image: url('/keji.jpg'); /* 确认路径正确：public目录下直接写 /文件名 */
  background-size: cover; /* 保持覆盖，但配合 background-position 调整显示区域 */
  background-position: center center; /* 垂直水平都居中，优先显示图片中间区域 */
  background-attachment: fixed; /* 固定背景，不随滚动移动（若有） */
  background-repeat: no-repeat;
  position: relative; /* 确保遮罩定位正确 */
}

/* 遮罩样式不变，确保层级正确 */
.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 0;
}

/* 登录卡片样式不变，保留之前的高度限制 */
.login-card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  max-height: calc(100vh - 40px); /* 限制卡片高度，避免内部内容撑开页面 */
  overflow-y: auto;
}

/* 其他原有样式不变 */
.form-group input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

button:hover {
  transition: all 0.3s ease;
}
</style>
