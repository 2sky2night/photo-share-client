<template>
  <div class="logo-container">
    <span class="title">PhotoShare</span>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Logo",
});
</script>

<style scoped lang="scss">
.logo-container {
  text-align: center;
  height: 50px;
  line-height: 50px;
  .title {
    position: relative;
    top: 2px;
    font-size: 30px;
    font-weight: 600;
    color: var(--primary-color);
  }
}
</style>
