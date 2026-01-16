<template>
  <div class="user-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" size="small" @click="openCreate">
            新增用户
          </el-button>
        </div>
      </template>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="160" />
        <el-table-column prop="age" label="年龄" width="100" />
        <el-table-column prop="gender" label="性别" width="100" />
        <el-table-column prop="password" label="密码" width="180" />
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="openEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" link size="small" @click="removeUser(scope.row.username)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="400px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" type="number" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'
defineOptions({ name: 'UsersIndex' })

type UserItem = {
  username: string
  password: string
  age?: string
  gender?: string
  createdAt: string
}

const STORAGE_KEY = 'users'

const users = ref<UserItem[]>([])
const dialogVisible = ref(false)
const dialogTitle = ref('新增用户')
const isEdit = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: '',
  age: '',
  gender: '',
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于 6 位', trigger: 'blur' },
  ],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
})

const loadUsers = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) {
    users.value = []
    return
  }
  try {
    const parsed = JSON.parse(saved) as Array<{
      username: string
      password: string
      age?: string
      gender?: string
      createdAt?: string
    }>
    users.value = parsed.map((u) => ({
      username: u.username,
      password: u.password,
      age: u.age || '',
      gender: u.gender || '',
      createdAt: u.createdAt || new Date().toLocaleString(),
    }))
  } catch {
    users.value = []
  }
}

const saveUsers = () => {
  const data = users.value.map((u) => ({
    username: u.username,
    password: u.password,
    age: u.age,
    gender: u.gender,
    createdAt: u.createdAt,
  }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const resetForm = () => {
  form.username = ''
  form.password = ''
  form.age = ''
  form.gender = ''
}

const openCreate = () => {
  dialogTitle.value = '新增用户'
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

const openEdit = (row: UserItem) => {
  dialogTitle.value = '编辑用户'
  isEdit.value = true
  form.username = row.username
  form.password = row.password
  form.age = row.age || ''
  form.gender = row.gender || ''
  dialogVisible.value = true
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) return
    if (isEdit.value) {
      const index = users.value.findIndex((u) => u.username === form.username)
      if (index !== -1) {
        users.value[index].password = form.password
        users.value[index].age = form.age
        users.value[index].gender = form.gender
      }
      ElMessage.success('修改成功')
    } else {
      if (users.value.some((u) => u.username === form.username)) {
        ElMessage.error('用户名已存在')
        return
      }
      users.value.push({
        username: form.username,
        password: form.password,
        age: form.age,
        gender: form.gender,
        createdAt: new Date().toLocaleString(),
      })
      ElMessage.success('新增成功')
    }
    saveUsers()
    dialogVisible.value = false
  })
}

const removeUser = (username: string) => {
  if (!username) return
  ElMessageBox.confirm(`确定删除用户 ${username} 吗？`, '提示', {
    type: 'warning',
  })
    .then(() => {
      users.value = users.value.filter((u) => u.username !== username)
      saveUsers()
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

onMounted(() => {
  loadUsers()
})
</script>

<style scoped>
.user-page {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
