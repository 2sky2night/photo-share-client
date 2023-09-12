<template>
  <div class="skeleton-container" :style="style"></div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  width?: string;
  height?: string;
}>(),
  {
    width: '100%',
    height: '100%'
  })

const style = computed(() => {
  return {
    width: props.width,
    height: props.height
  }
})

defineOptions({
  name: 'Skeleton'
})
</script>

<style scoped lang='scss'>
.skeleton-container {
  background-image: linear-gradient(90deg,
      var(--skeleton-color-1) 25%,
      var(--skeleton-color-2) 30%,
      var(--skeleton-color-1) 40%);
  background-size: 400% 100%;
  background-position: 100% 50%;
  animation: skeleton var(--time-long) infinite ease;
}

@keyframes skeleton {
  from {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 100%
  }
}
</style>