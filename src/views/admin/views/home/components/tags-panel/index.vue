<template>
  <div class="tags-panel-container">
    <title-comp>{{ $t("tagsTotal") }}</title-comp>
    <div class="container">
      <lazy-component
        suspense
        min-height="300px">
        <tags-charts :days="0"></tags-charts>
      </lazy-component>
      <lazy-component
        suspense
        min-height="300px">
        <tags-charts :days="7"></tags-charts>
      </lazy-component>
      <lazy-component
        suspense
        min-height="300px">
        <tags-charts></tags-charts>
      </lazy-component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LazyComponent from "@/components/lazy-component/index.vue";
import TitleComp from "../title/index.vue";
import TagsCharts from "./components/tags-charts.vue";
defineOptions({
  name: "TagsPanel",
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-around;
}
@media screen and (max-width: 800px) {
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
