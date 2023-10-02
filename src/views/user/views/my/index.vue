<template>
  <div class="my-page">
    <my-info></my-info>
  </div>
</template>

<script lang='ts' setup>
import MyInfo from './components/my-info.vue'
defineOptions({
  name:"My"
})
</script>

<style scoped lang='scss'>
.my-page{
  padding: 10px;
}
</style>