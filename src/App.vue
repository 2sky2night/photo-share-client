<template>
  <div class="root">
    <n-message-provider>
      <Layout></Layout>
    </n-message-provider>
  </div>
</template>

<script lang='ts' setup>
import Layout from '@/layouts/root/index.vue'
</script>

<style scoped lang="scss">
.root {
  background-color: var(--bg-color-1);
}
</style>
