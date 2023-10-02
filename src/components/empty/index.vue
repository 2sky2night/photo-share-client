<template>
  <div class="no-data" :class="className">
    <n-empty :size="size" :description="desc"></n-empty>
  </div>
</template>

<script lang='ts' setup>
const props = withDefaults(defineProps<
  { desc: string, size?: "small" | "medium" | "large" | "huge" | undefined }>(),
  { size: 'medium' })

const className = {
  [`${props.size}-type`]: true
}

defineOptions({
  name: "NoData"
})
</script>

<style scoped lang='scss'>
.no-data {
  &.large-type {
    padding: 20px;
  }

  &.medium-type {
    padding: 15px;
  }

  &.small-type {
    padding: 10px;
  }
}
</style>