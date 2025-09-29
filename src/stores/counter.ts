import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: '计数器',
  }),

  getters: {
    doubleCount: (state) => state.count * 2,

    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    },
  },

  // 方法（类似 Vuex 的 mutations + actions，Pinia 中统一用 actions）
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    // 支持异步操作
    async incrementAsync() {
      await new Promise((resolve) => setTimeout(resolve, 100))
      this.increment()
    },
  },

  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  // return { count, doubleCount, increment }
})
