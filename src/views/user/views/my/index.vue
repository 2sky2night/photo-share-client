<template>
  <div class="my-page">
    <my-info></my-info>
    <my-tabs class="mt-10"></my-tabs>
  </div>
</template>

<script lang="ts" setup>
import MyInfo from "./components/my-info.vue";
import MyTabs from "./components/my-tabs.vue";
defineOptions({
  name: "My",
});
</script>

<style scoped lang="scss">
.my-page {
  padding: 10px;
}
</style>
