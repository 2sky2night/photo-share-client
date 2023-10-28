<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useMessage, useNotification } from "naive-ui";

// 给全局对象挂载api
window.$message = useMessage();
window.$notify = useNotification();

defineOptions({
  name: "Root",
});
</script>
