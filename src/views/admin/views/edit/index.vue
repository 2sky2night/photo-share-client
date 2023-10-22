<template>
  <div class="edit-page admin-page">
    <info-password style="margin-bottom: 50px;"></info-password>
    <edit-password></edit-password>
  </div>
</template>

<script lang="ts" setup>
import EditPassword from "./components/password/index.vue";
import InfoPassword from "./components/info/index.vue";
defineOptions({ name: "EditPage" });
</script>

<style scoped lang="scss">
.edit-page {
  padding: 20px;
}
</style>
