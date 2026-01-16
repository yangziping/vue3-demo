<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="login-header">
          <h2>系统登录</h2>
        </div>
      </template>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0"
        size="large"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名: admin"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码: 123456"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="rememberMe">记住用户名密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            :loading="loading"
            @click="handleLogin(loginFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="registerDialogVisible = true">
            没有账号？立即注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog v-model="registerDialogVisible" title="用户注册" width="400px">
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="registerDialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="registerLoading" @click="handleRegister(registerFormRef)">
            注册
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
defineOptions({ name: 'LoginPage' })

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)
const registerDialogVisible = ref(false)
const registerFormRef = ref<FormInstance>()
const registerLoading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于 6 位', trigger: 'blur' }
  ]
})

const registerRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于 6 位', trigger: 'blur' }
  ],
  confirmPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'))
        } else if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const getUsers = (): Array<{ username: string; password: string }> => {
  const saved = localStorage.getItem('users')
  if (!saved) return []
  try {
    const parsed = JSON.parse(saved) as Array<{ username: string; password: string }>
    if (Array.isArray(parsed)) {
      return parsed
    }
    return []
  } catch (e) {
    console.error('parse users error', e)
    return []
  }
}


onMounted(() => {
  const saved = localStorage.getItem('rememberLogin')
  if (saved) {
    try {
      const info = JSON.parse(saved) as { username?: string; password?: string }
      if (info.username) {
        loginForm.username = info.username
      }
      if (info.password) {
        loginForm.password = info.password
      }
      rememberMe.value = true
    } catch (e) {
      console.error('parse rememberLogin error', e)
    }
  }
})

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        const users = getUsers()
        const exists = users.some(
          (u) => u.username === loginForm.username && u.password === loginForm.password,
        )
        if (exists || (loginForm.username === 'admin' && loginForm.password === '123456')) {
          ElMessage.success('登录成功')
          localStorage.setItem('isLogin', 'true')
          localStorage.setItem('userInfo', JSON.stringify({ username: loginForm.username }))

          if (rememberMe.value) {
            localStorage.setItem(
              'rememberLogin',
              JSON.stringify({
                username: loginForm.username,
                password: loginForm.password,
              }),
            )
          } else {
            localStorage.removeItem('rememberLogin')
          }

          router.push('/dashboard')
        } else {
          ElMessage.error('用户名或密码错误')
        }
      }, 1000)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      registerLoading.value = true
      setTimeout(() => {
        const users = getUsers()
        if (users.some((u) => u.username === registerForm.username)) {
          registerLoading.value = false
          ElMessage.error('用户名已存在')
          return
        }
        users.push({
          username: registerForm.username,
          password: registerForm.password
        })
        localStorage.setItem('users', JSON.stringify(users))
        registerLoading.value = false
        ElMessage.success('注册成功，请使用新账号登录')
        registerDialogVisible.value = false
        loginForm.username = registerForm.username
        loginForm.password = registerForm.password
        rememberMe.value = true
        localStorage.setItem(
          'rememberLogin',
          JSON.stringify({
            username: loginForm.username,
            password: loginForm.password
          }),
        )
      }, 500)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/nidemingzi.jpg') center center / cover no-repeat;
  opacity: 1;
  z-index: 0;
}

.login-card {
  position: relative;
  z-index: 1;
  width: 400px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
}

.login-header {
  text-align: center;
  font-weight: bold;
}

.login-button {
  width: 100%;
}
</style>
