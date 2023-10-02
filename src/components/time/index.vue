<template>
  <span class="time" :class="{ 'sub': sub }">{{ dayjs(timeStr).format('YYYY-MM-DD HH:mm:ss') }}</span>
</template>

<script lang='ts' setup>
import dayjs from 'dayjs'
withDefaults(defineProps<{ timeStr: string; sub?: boolean }>(), { sub: true })
defineOptions({
  name: 'TimeFormat'
})
</script>

<style scoped lang='scss'>
.time {
  color: var(--text-color-1);

  &.sub {
    color: var(--text-color-2);
    font-size: 12px
  }
}
</style>