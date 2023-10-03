<template>
  <auth-action>
    <n-icon class="mr-5" :size="size" @click="onHandleLike" color="red">
      <component :is="isLiked?Heart:HeartOutline"></component>
    </n-icon>
  </auth-action>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import AuthAction from '../auth-action/index.vue'
import { Heart, HeartOutline } from '@vicons/ionicons5';
import { likePhotoAPI, cancelLikePhotoAPI } from '@User/apis/photo'

const props = defineProps<{ pid: number; isLiked: boolean; likeCount: number; size: number }>()
const emit = defineEmits<{
  'update:likeCount': [value: number],
  'update:isLiked': [value: boolean]
  'update:likeStatus': [status: boolean, count: number]
}>()
const isLoading = ref(false)

// 点赞的回调
const onHandleLike = async () => {
  if (isLoading.value) return
  isLoading.value = true
  if (props.isLiked) {
    await cancelLikePhotoAPI(props.pid)
    emit('update:isLiked', false)
    emit('update:likeCount', props.likeCount - 1)
    emit('update:likeStatus', false, props.likeCount - 1)
  } else {
    await likePhotoAPI(props.pid)
    emit('update:isLiked', true)
    emit('update:likeCount', props.likeCount + 1)
    emit('update:likeStatus', true, props.likeCount + 1)
  }
  isLoading.value = false
}

defineOptions({
  name: 'LikePhotoBtn'
})
</script>

<style scoped lang='scss'>
:deep(i) {
  position: relative;
  top: 2px;
  cursor: pointer;
}
</style>