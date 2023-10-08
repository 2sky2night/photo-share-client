<template>
用户
</template>

<script lang='ts' setup>
import { SearchType } from '../../../types';

// props
const props = defineProps<{
  pageNum: number;
  keywords: string;
  pageSize: number;
}>();
// emit
const emit = defineEmits<{
  "update:searchType": [value: SearchType];
  "update:pageNum": [value: number];
  "update:pageSize": [value: number];
}>();
</script>

<style scoped lang='scss'>

</style>