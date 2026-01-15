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
            >  忘记密码？</a
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  overflow: hidden;
  background-image: url('/keji.jpg');
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: relative;
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
