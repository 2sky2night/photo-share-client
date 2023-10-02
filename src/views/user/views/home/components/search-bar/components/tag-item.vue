<template>
  <div class="tag-item p-btn">{{ title }}</div>
</template>

<script lang='ts' setup>
defineProps<{ title: string }>()
</script>

<style scoped lang='scss'>
.tag-item {
  &:not(:last-child) {
    margin-right: 5px;
  }

}
</style>