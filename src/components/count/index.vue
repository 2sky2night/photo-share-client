<template>
  <span class="count-format" :class="{ 'sub': sub }">{{ formatCount(count) }}</span>
</template>

<script lang='ts' setup>
import { formatCount } from '@/utils'
withDefaults(defineProps<{ count: number; size?: string, sub?: boolean }>(), { size: '12px', sub: true })
defineOptions({
  name: "CountFormat"
})
</script>

<style scoped lang='scss'>
.count-format {
  font-size: v-bind(size);
  color: var(--text-color-1);

  &.sub {
    color: var(--text-color-2);
  }
}
</style>