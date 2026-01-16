<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

// 获取 store 实例
const counterStore = useCounterStore()

// 重置计数器
const reset = () => {
  // 方法1：直接修改状态
  counterStore.count = 0

  // 方法2：使用 $reset() 重置为初始状态
  // counterStore.$reset()
}
</script>
<template>
  <div class="counter">
    <h2>{{ counterStore.name }}</h2>
    <p>当前计数: {{ counterStore.count }}</p>
    <p>计数翻倍: {{ counterStore.doubleCount }}</p>
    <p>翻倍加一: {{ counterStore.doubleCountPlusOne }}</p>

    <button @click="counterStore.increment">+1</button><br />
    <button @click="counterStore.decrement">-1</button><br />
    <button @click="counterStore.incrementAsync">异步+1</button><br />
    <button @click="reset">重置</button><br />
  </div>
</template>
