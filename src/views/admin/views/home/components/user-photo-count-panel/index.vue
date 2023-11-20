<template>
  <div class="user-photo-count-panel">
    <title-comp>{{ $t("userPhotoCountTotal") }}</title-comp>
    <lazy-component suspense>
      <user-photos-count-charts />
    </lazy-component>
  </div>
</template>

<script lang="ts" setup>
import TitleComp from "../title/index.vue";
import LazyComponent from "@/components/lazy-component/index.vue";
import userPhotosCountCharts from "./components/user-photos-count-charts.vue";
defineOptions({
  name: "UserPhotoCountPanel",
});
</script>
