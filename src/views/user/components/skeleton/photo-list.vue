<template>
  <div class="photo-list-container">
    <div class="photo-skeleton" v-for="item in length">
      <div class="img">
        <skeleton></skeleton>
      </div>
      <div class="info">
        <skeleton height="13px"  class="mb-10"></skeleton>
        <skeleton height="13px" width="30%"></skeleton>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
withDefaults(defineProps<{ length?: number }>(), { length: 15 })
</script>

<style scoped lang='scss'>
.photo-list-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  .photo-skeleton {
    height: 45vh;

    .img {
      border-radius: 10px;
      width: 100%;
      height: 80%;
      overflow: hidden;
    }

    .info {
      box-sizing: border-box;
      padding: 10px 5px;
      height: 20%;
    }
  }
}

@media screen and (max-width:1200px) {
  .photo-list-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width:800px) {
  .photo-list-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width:600px) {
  .photo-list-container {
    gap: 20px;
    .photo-skeleton {
      height: 30vh;
    }
  }
}
</style>