<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script lang='ts' setup>
defineOptions({
  name:'Main'
})
</script>

<style scoped lang='scss'>
.main-container{
  height: calc(100% - var(--user-header-height));
  overflow-x: hidden;
  overflow-y: auto;
}
</style>