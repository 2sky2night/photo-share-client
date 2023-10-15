<template>
  <div class="user-list-skeleton">
    <div
      class="item"
      v-for="_item in length">
      <skeleton
        class="mr-10"
        round="10%"
        width="35px"
        height="35px">
      </skeleton>
      <div class="info">
        <skeleton
          class="username"
          width="30%"
          height="20px"></skeleton>
        <div class="dec mt-10">
          <skeleton
            class="mb-10"
            height="18px"
            width="100%"></skeleton>
          <skeleton
            width="60%"
            height="18px"></skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ length?: number }>(), { length: 20 });
</script>

<style scoped lang="scss">
.user-list-skeleton {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  .item {
    display: flex;
    padding: 5px 10px;
    .info {
      flex-grow: 1;
    }
  }
  @media screen and (max-width:650px){
    display: flex;
    flex-direction: column;
    >div{
      margin-bottom: 10px;
    }
  }
}
</style>
