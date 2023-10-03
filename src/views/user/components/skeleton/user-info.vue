<template>
  <div class="user-info-skeleton">
    <div class="avatar mr-10"><skeleton round="50%"></skeleton></div>
    <div class="info">
      <skeleton
        width="30%"
        height="20px"
        class="mb-10"></skeleton>
      <skeleton
        width="100%"
        class="mb-5"
        height="15px"></skeleton>
      <skeleton
        width="100%"
        class="mb-5"
        height="15px"></skeleton>
      <skeleton
        width="30%"
        height="15px"></skeleton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-info-skeleton {
  padding: 18px 15px;
  display: flex;
  .avatar {
    width: 150px;
    height: 150px;
  }
  .info {
    padding: 10px 0;
    flex-grow: 1;
  }
}
@media screen and (max-width: 650px) {
  .user-info-skeleton {
    padding: 10px;
    .avatar {
      align-self: center;
      height: 70px;
      width: 70px;
    }
    .info {
      > div:first-child {
        height: 15px !important;
      }
      > div {
        height: 13px !important;
      }
    }
  }
}
</style>
