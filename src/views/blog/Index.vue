<template>
  <div class="blog-page">
    <section class="hero">
      <div class="hero-content">
        <h1>社区博客</h1>
        <p>展示用户创作的精彩文章</p>
      </div>
    </section>

    <el-row :gutter="20" class="list">
      <el-col :xs="24" :sm="12" :md="8" v-for="item in blogs" :key="item.id">
        <el-card
          class="blog-card"
          shadow="hover"
          @click="goToDetail(item.id)"
          style="cursor: pointer; transition: all 0.3s ease"
          @mouseenter="cardHovered = item.id"
          @mouseleave="cardHovered = null"
        >
          <div class="card-header">
            <h3 class="title">{{ item.title }}</h3>
            <div class="meta">
              <span class="author">作者：{{ item.author }}</span>
              <span class="date">{{ item.publishDate }}</span>
            </div>
          </div>
          <div class="tags">
            <el-tag
              v-for="(t, i) in item.tags"
              :key="t + i"
              :type="tagType(i)"
              round
              class="tag"
            >
              {{ t }}
            </el-tag>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="read-more">阅读全文 →</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
defineOptions({ name: 'BlogIndex' })

type ArticleItem = {
  id: string
  title: string
  content: string
  author: string
  publishDate: string
}

type BlogItem = ArticleItem & { tags: string[] }

const router = useRouter()
const blogs = ref<BlogItem[]>([])
const cardHovered = ref<string | null>(null)

const deriveTags = (a: ArticleItem): string[] => {
  const base = [
    ...a.title
      .replace(/[，。！？、,.!?:;()\[\]{}]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 3),
  ]
  if (!base.length) base.push('随笔')
  base.push(a.author || '分享')
  return Array.from(new Set(base)).slice(0, 5)
}

const tagType = (index: number): 'success' | 'warning' | 'danger' | 'info' => {
  return (['success', 'warning', 'danger', 'info'] as const)[index % 4]
}

const loadBlogs = () => {
  const saved = localStorage.getItem('articles')
  console.log('Blog list loading articles:', saved)
  if (!saved) {
    blogs.value = []
    return
  }
  try {
    const parsed = JSON.parse(saved) as ArticleItem[]
    blogs.value = parsed.map((a) => ({ ...a, tags: deriveTags(a) }))
    console.log('Blogs loaded:', blogs.value)
  } catch {
    blogs.value = []
  }
}

const goToDetail = (id: string) => {
  console.log('Navigating to blog detail with id:', id)
  router.push({ name: 'blog-detail', params: { id } })
}

onMounted(() => {
  loadBlogs()
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background:
    radial-gradient(1200px 600px at -10% 0%, #ffedd5 0, transparent 60%),
    radial-gradient(1000px 500px at 110% 10%, #dbeafe 0, transparent 60%),
    linear-gradient(180deg, #fff, #f8fafc);
  padding-bottom: 40px;
}
.hero {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(135deg, #fca5a5 0%, #fdba74 30%, #fde68a 60%, #86efac 100%);
  color: #1f2937;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}
.hero-content {
  text-align: center;
}
.hero h1 {
  font-size: 32px;
  margin: 0;
}
.hero p {
  margin: 8px 0 0;
  font-weight: 500;
}
.list {
  margin-top: 20px;
  padding: 0 20px;
}
.blog-card {
  border-radius: 14px;
  margin-top: 20px;
  background: linear-gradient(160deg, #ffffff, #fafafa);
  height: 320px;
  display: flex;
  flex-direction: column;
}
.card-header {
  margin-bottom: 6px;
}
.title {
  margin: 0;
  font-size: 18px;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.meta {
  font-size: 12px;
  color: #6b7280;
  display: flex;
  gap: 10px;
}
.tags {
  margin: 8px 0 10px;
  max-height: 48px;
  overflow: hidden;
}
.tag {
  margin-right: 8px;
  margin-bottom: 6px;
}
.content {
  color: #374151;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  word-break: break-word;
  margin-bottom: 12px;
}

.read-more {
  color: #3b82f6;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.blog-card:hover .read-more {
  color: #1d4ed8;
  transform: translateX(4px);
}
</style>
