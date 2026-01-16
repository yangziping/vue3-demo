<template>
  <div class="article-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>文章管理</span>
          <el-button type="primary" size="small" @click="openCreate">
            新增文章
          </el-button>
        </div>
      </template>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="publishDate" label="发布时间" width="180" />
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="openEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click.stop="removeArticle(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="80%"
      max-height="90vh"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <md-editor
            v-model="form.content"
            height="400px"
            :toolbars="toolbars"
            :preview="true"
            @on-upload-img="onUploadImg"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click.stop="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click.stop="submitForm(formRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessageBox, ElMessage } from "element-plus";
import { MdEditor } from "md-editor-v3";
import type { ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
defineOptions({ name: "ArticlesIndex" });

type ArticleItem = {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
};

const STORAGE_KEY = "articles";

const articles = ref<ArticleItem[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref("新增文章");
const isEdit = ref(false);
const formRef = ref<FormInstance>();

const form = reactive({
  id: "",
  title: "",
  content: "",
  author: "",
});

const rules = reactive<FormRules>({
  title: [
    { required: true, message: "请输入标题", trigger: "blur" },
    { min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: "blur" },
  ],
  author: [{ required: true, message: "请输入作者", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
});

const toolbars: ToolbarNames[] = [
  "bold",
  "underline",
  "italic",
  "-",
  "title",
  "strikeThrough",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task",
  "-",
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "-",
  "revoke",
  "next",
  "=",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "previewOnly",
];

const loadArticles = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    articles.value = [];
    return;
  }
  try {
    const parsed = JSON.parse(saved) as ArticleItem[];
    articles.value = parsed;
  } catch {
    articles.value = [];
  }
};

const saveArticles = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles.value));
};

const resetForm = () => {
  form.id = "";
  form.title = "";
  form.content = "";
  form.author = "";
};

const openCreate = () => {
  dialogTitle.value = "新增文章";
  isEdit.value = false;
  resetForm();
  dialogVisible.value = true;
};

const openEdit = (row: ArticleItem) => {
  dialogTitle.value = "编辑文章";
  isEdit.value = true;
  form.id = row.id;
  form.title = row.title;
  form.content = row.content;
  form.author = row.author;
  dialogVisible.value = true;
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (!valid) return;
    if (isEdit.value) {
      const index = articles.value.findIndex((u) => u.id === form.id);
      if (index !== -1) {
        articles.value[index].title = form.title;
        articles.value[index].content = form.content;
        articles.value[index].author = form.author;
      }
      ElMessage.success("修改成功");
    } else {
      articles.value.push({
        id: Date.now().toString(),
        title: form.title,
        content: form.content,
        author: form.author,
        publishDate: new Date().toLocaleString(),
      });
      ElMessage.success("新增成功");
    }
    saveArticles();
    dialogVisible.value = false;
  });
};

const removeArticle = (id: string) => {
  ElMessageBox.confirm("确定删除该文章吗？", "提示", {
    type: "warning",
  })
    .then(() => {
      articles.value = articles.value.filter((u) => u.id !== id);
      saveArticles();
      ElMessage.success("删除成功");
    })
    .catch(() => {});
};

const onUploadImg = async (
  files: File[],
  callback: (urls: string[]) => void
) => {
  // 使用 Base64 编码本地存储图片
  const urls: string[] = [];
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        urls.push(e.target.result as string);
        if (urls.length === files.length) {
          callback(urls);
        }
      }
    };
    reader.readAsDataURL(file);
  }
};

onMounted(() => {
  loadArticles();
});
</script>

<style scoped>
.article-page {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.md-editor) {
  border: 1px solid #dcdfe6 !important;
  border-radius: 4px;
}

:deep(.md-editor-toolbar) {
  border-bottom: 1px solid #dcdfe6;
  background-color: #fafafa;
}

:deep(.md-editor .md-editor-content-input) {
  padding: 8px;
}
</style>
