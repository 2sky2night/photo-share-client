<template>
  <div class="backgourd">
    <template v-if="finish">
      <div class="layout">
        <pic-item v-for="item in list" :url="item.url"></pic-item>
      </div>
    </template>
    <template v-else>
      <div class="loading"></div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import { ref, onBeforeMount } from 'vue'
import { randomPicAPI } from '@/apis/photo'
import { PicData } from '@/apis/photo/types';
import PicItem from './pic-item.vue';

const finish = ref(false)
const list: PicData[] = []
const emit = defineEmits<{
  isFinsh: []
}>()
const props = defineProps<{ length: number }>()

// 获取数据
const onHandleGetData = async () => {
  const res = await randomPicAPI(props.length)
  res.data.list.forEach(pic => list.push(pic))
  finish.value = true
  // 通知父组件加载完成
  emit('isFinsh')
}

onBeforeMount(onHandleGetData)

defineOptions({
  name: "LayoutBackgourd"
})
</script>

<style scoped lang='scss'>
.backgourd {
  width: 160vw;

  .loading {
    height: 100vh;
    background-color: var(--bg-color-2);
  }

  .layout {
    display: flex;
    flex-wrap: wrap;
    transform: rotateZ(-25deg) scale(2);
  }
}
</style>