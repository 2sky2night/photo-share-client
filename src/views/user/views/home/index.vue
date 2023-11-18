<template>
  <div class="home-page">
    <search-bar style="margin-bottom: 10px"></search-bar>
    <tags></tags>
    <content></content>
  </div>
</template>

<script lang="ts" setup>
import SearchBar from "./components/search-bar/index.vue";
import Content from "./components/content/index.vue";
import Tags from "./components/tags/index.vue";
defineOptions({
  name: "HomePage",
});
</script>

<style scoped lang="scss">
.home-page {
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 45px;
  height: 100%;
  @media screen and (max-width: 650px) {
    padding: 10px;
    padding-top: 30px;
  }
}
</style>
