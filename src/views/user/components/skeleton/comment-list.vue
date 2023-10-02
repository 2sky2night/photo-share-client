<template>
  <div class="comment-skeleton" v-for="item in length">
    <div class="header mb-10">
      <skeleton round="50%" width="30px"></skeleton>
      <skeleton class="ml-5" height="15px" width="20%"></skeleton>
    </div>
    <div class="content mb-10">
      <skeleton class="mb-5" height="15px"></skeleton>
      <skeleton class="mb-5" height="15px"></skeleton>
      <skeleton height="15px" width="20%"></skeleton>
    </div>
    <div class="time">
      <skeleton height="15px" width="10%"></skeleton>
    </div>
  </div>
</template>

<script lang='ts' setup>
defineProps<{ length: number }>()
</script>

<style scoped lang='scss'>
.comment-skeleton {
  .header {
    height: 30px;
    align-items: center;
    display: flex;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>