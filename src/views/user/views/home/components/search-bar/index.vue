<template>
  <div class="search-bar-container">
    <div class="input-container">
      <n-input :placeholder="$t('searchTip')"></n-input>
    </div>
    <div class="tags-container mt-10">
      <tag-item v-for="item in tags" :title="item"></tag-item>
    </div>
  </div>
</template>

<script lang='ts' setup>
import tagItem from './components/tag-item.vue'
const tags = [
  '生活',
  '游戏',
  '运动',
  '美食',
  '情感',
  '职场'
]

defineOptions({
  name: 'SearchBar'
})
</script>

<style scoped lang='scss'>
.search-bar-container {
  margin:0 20vw;
  transition: var(--time-normal);
  .input-container {}

  .tags-container {
    display: flex;
    flex-wrap: wrap;
  }
}
@media screen and (max-width:650px) {
  .search-bar-container{
    margin: 0 20px
  }
}
</style>