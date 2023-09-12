<template>
  <div class="pic-item-container">
    <img-lazy :url="'http://127.0.0.1:3000'+url"></img-lazy>
  </div>
</template>

<script lang='ts' setup>
defineProps<{ url: string }>()
</script>

<style scoped lang='scss'>
.pic-item-container {
  width: 10vw;
  height: 10vw;
  
  :deep(img) {
    display: block;
    object-fit: cover;
  }
}
</style>