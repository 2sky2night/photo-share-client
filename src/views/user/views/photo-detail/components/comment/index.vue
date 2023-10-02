<template>
  <div class="comment-container">
    <comment-list :pid="pid"></comment-list>
    <post-comment class="mt-10" :pid="pid"></post-comment>
  </div>
</template>

<script lang='ts' setup>
import CommentList from './components/comment-list/index.vue'
import PostComment from './components/post-comment/index.vue'

// props
defineProps<{ pid: number }>()

defineOptions({
  name: 'Comment'
})
</script>