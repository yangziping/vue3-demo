<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <!-- <main>
    <TheWelcome />
  </main> -->
  <div class="father">
    <div class="son">新丰商城</div>
  </div>
</template>

<style lang="less" scoped>
@import '../theme/custom.less';
.father {
  .son {
    color: @primary;
    font-size: 40px;
    text-align: center;
    /* margin-top: 200px; */
  }
}
</style>
