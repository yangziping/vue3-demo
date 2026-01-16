<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/dashboard">
            <el-icon><Menu /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
          <el-menu-item index="/users">
            <el-icon><Menu /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/articles">
            <el-icon><Document /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="/blog">
            <el-icon><Document /></el-icon>
            <span>博客</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-content">
            <span>后台管理系统</span>
            <div class="header-right">
              <span class="username" v-if="username">欢迎，{{ username }}</span>
              <el-button type="danger" size="small" @click="handleLogout"
                >退出登录</el-button
              >
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Menu, Document } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";

const router = useRouter();
const username = ref("");

onMounted(() => {
  const userInfoStr = localStorage.getItem("userInfo");
  if (userInfoStr) {
    try {
      const userInfo = JSON.parse(userInfoStr);
      username.value = userInfo.username || "";
    } catch (e) {
      console.error("Failed to parse userInfo", e);
    }
  }
});

const handleLogout = () => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("userInfo");
  router.push("/login");
};
</script>

<style scoped>
.common-layout {
  height: 100vh;
  width: 100vw;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
  color: #333;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}
.username {
  font-size: 14px;
  color: #666;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
