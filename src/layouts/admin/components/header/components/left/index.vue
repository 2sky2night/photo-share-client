<template>
  <div class="left-container">
    <menu-expand-btn></menu-expand-btn>
    <breadcrumb class="ml-10"></breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from './components/breadcrumb.vue'
import MenuExpandBtn from './components/menu-expand-btn.vue'
defineOptions({
  name: "Left",
});
</script>

<style scoped lang="scss">
.left-container {
  display: flex;
}
</style>
