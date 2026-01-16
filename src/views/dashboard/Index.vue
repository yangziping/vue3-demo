<template>
  <div class="dashboard">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>欢迎回来</span>
        </div>
      </template>
      <div>这是一个基于 Vue 3 + Element Plus 的后台管理系统示例。</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "DashboardIndex" });
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
