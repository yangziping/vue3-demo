<template>
  <div class="blog-detail">
    <el-button type="info" @click="goBack" class="back-btn">
      <el-icon><ArrowLeft /></el-icon>
      返回列表
    </el-button>

    <div v-if="loading" class="loading">
      <el-skeleton :rows="5" animated />
    </div>

    <el-card v-else-if="article" class="detail-card">
      <div class="detail-header">
        <h1>{{ article.title }}</h1>
        <div class="meta-info">
          <span class="author">
            <el-icon><User /></el-icon>
            {{ article.author }}
          </span>
          <span class="date">
            <el-icon><Clock /></el-icon>
            {{ article.publishDate }}
          </span>
        </div>
      </div>

      <div class="divider"></div>

      <div class="detail-content markdown-body" v-html="renderedContent"></div>
    </el-card>

    <el-empty v-else description="文章不存在" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft, User, Clock } from '@element-plus/icons-vue'
import { marked } from 'marked'
import 'github-markdown-css'

defineOptions({ name: 'BlogDetail' })

type ArticleItem = {
  id: string
  title: string
  content: string
  author: string
  publishDate: string
}

const router = useRouter()
const route = useRoute()
const article = ref<ArticleItem | null>(null)
const loading = ref(true)

// 计算渲染后的 markdown 内容
const renderedContent = computed(() => {
  if (!article.value) return ''
  return marked(article.value.content)
})

const loadArticle = () => {
  loading.value = true
  const articleId = route.params.id as string
  
  console.log('Loading article with ID:', articleId)
  
  if (!articleId) {
    ElMessage.error('文章ID不存在')
    setTimeout(() => router.back(), 500)
    loading.value = false
    return
  }

  const saved = localStorage.getItem('articles')
  console.log('Saved articles in localStorage:', saved)
  
  if (!saved) {
    ElMessage.error('文章不存在')
    setTimeout(() => router.back(), 500)
    loading.value = false
    return
  }

  try {
    const articles = JSON.parse(saved) as ArticleItem[]
    console.log('Parsed articles:', articles)
    
    const found = articles.find((a) => a.id === articleId)
    console.log('Found article:', found)
    
    if (!found) {
      ElMessage.error('文章不存在')
      setTimeout(() => router.back(), 500)
    } else {
      article.value = found
    }
  } catch (e) {
    console.error('加载文章失败', e)
    ElMessage.error('加载文章失败')
    setTimeout(() => router.back(), 500)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}

// 监听路由参数变化
watch(() => route.params.id, () => {
  loadArticle()
}, { immediate: true })

onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.blog-detail {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.back-btn {
  margin-bottom: 20px;
}

.loading {
  margin-bottom: 20px;
}

.detail-card {
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: linear-gradient(160deg, #ffffff, #fafafa);
}

.detail-header {
  margin-bottom: 24px;
}

.detail-header h1 {
  margin: 0 0 16px;
  font-size: 32px;
  color: #111827;
  word-break: break-word;
}

.meta-info {
  display: flex;
  gap: 24px;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
}

.meta-info span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, #e5e7eb, transparent);
  margin-bottom: 24px;
}

.detail-content {
  line-height: 1.8;
  color: #374151;
  word-break: break-word;
  font-size: 16px;
}

.detail-content h1,
.detail-content h2,
.detail-content h3,
.detail-content h4,
.detail-content h5,
.detail-content h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #111827;
}

.detail-content h1 {
  font-size: 28px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 8px;
}

.detail-content h2 {
  font-size: 24px;
}

.detail-content h3 {
  font-size: 20px;
}

.detail-content p {
  margin: 16px 0;
}

.detail-content ul,
.detail-content ol {
  margin: 16px 0;
  padding-left: 24px;
}

.detail-content li {
  margin: 8px 0;
}

.detail-content code {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 14px;
  color: #d63384;
}

.detail-content pre {
  background-color: #282c34;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin: 16px 0;
}

.detail-content pre code {
  color: #abb2bf;
  background-color: transparent;
  padding: 0;
  font-size: 14px;
}

.detail-content blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 16px;
  margin: 16px 0;
  color: #6b7280;
  background-color: #f9fafb;
  padding: 8px 16px;
  border-radius: 4px;
}

.detail-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
}

.detail-content table th,
.detail-content table td {
  border: 1px solid #dcdfe6;
  padding: 12px;
  text-align: left;
}

.detail-content table th {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #111827;
}

.detail-content a {
  color: #3b82f6;
  text-decoration: none;
}

.detail-content a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.detail-content img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 16px 0;
}

.detail-content hr {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 24px 0;
}
</style>
