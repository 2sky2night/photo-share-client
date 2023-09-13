<template>
  <div class="photo-share-page">
    <p-header></p-header>
    <p-main></p-main>
  </div>
</template>

<script lang='ts' setup>
import PMain from './components/main/index.vue'
import PHeader from './components/header/index.vue'
defineOptions({
  name: 'PhotoShare'
})
</script>

<style scoped lang='scss'>
.photo-share-page {
  height: 100vh;
}
</style>