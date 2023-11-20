<template>
  <div class="user-panel-container">
    <title-comp>{{ $t("rolesTotal") }}</title-comp>
    <div class="container">
      <lazy-component
        suspense
        min-height="300px">
        <user-charts :days="0"></user-charts>
      </lazy-component>
      <lazy-component
        suspense
        min-height="300px">
        <user-charts :days="7"></user-charts>
      </lazy-component>
      <lazy-component
        suspense
        min-height="300px">
        <user-charts></user-charts>
      </lazy-component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TitleComp from "../title/index.vue";
import LazyComponent from "@/components/lazy-component/index.vue";
import UserCharts from "./components/user-charts.vue";
defineOptions({
  name: "UserPanel",
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
