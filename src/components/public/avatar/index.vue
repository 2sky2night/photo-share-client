<template>
  <n-icon v-if="src === null" :size="size">
    <user-circle></user-circle>
  </n-icon>
  <n-avatar v-else :src="src" lazy></n-avatar>
</template>

<script lang='ts' setup>
import { UserCircle } from '@vicons/fa'
withDefaults(defineProps<{ src: null | string; size?: number }>(), { size: 20 })
defineOptions({
  name: 'avatar'
})
</script>

<style scoped lang="scss">
.n-icon {
  color: var(--text-color-1);
}
</style>