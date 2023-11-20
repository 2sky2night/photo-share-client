<template>
  <div class="home-page admin-page">
    <overall-panel />
    <tags-panel class="mt-10" />
    <user-panel class="mt-10" />
    <audit-panel class="mt-10" />
    <photo-views-panel class="mt-10" />
    <user-photo-count-panel class="mt-10" />
  </div>
</template>

<script lang="ts" setup>
import OverallPanel from "./components/overall-panel/index.vue";
import TagsPanel from "./components/tags-panel/index.vue";
import UserPanel from "./components/user-panel/index.vue";
import AuditPanel from "./components/audit-panel/index.vue";
import PhotoViewsPanel from "./components/photo-views-panel/index.vue";
import UserPhotoCountPanel from "./components/user-photo-count-panel/index.vue";
defineOptions({ name: "HomePage" });
</script>

<style scoped lang="scss">
.home-page {
  padding: 10px 20px;
}
</style>
