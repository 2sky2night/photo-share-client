<template>
  <n-h2
    class="ml-10"
    prefix="bar"
    align-text>
    <n-text type="primary"> 
      <slot></slot>
    </n-text>
  </n-h2>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Title",
});
</script>
