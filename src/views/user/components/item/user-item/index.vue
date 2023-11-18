<template>
  <div class="user-item">
    <avatar
      @click="onHandleClick"
      :src="user.avatar"
      :size="30"></avatar>
    <div class="user-info ml-10">
      <div class="header mb-10">
        <span
          class="text-hover"
          @click="onHandleClick">
          {{ user.username }}
        </span>
        <n-button
          type="primary"
          size="small"
          @click="onHandleFollow">
          {{ $t("follow") }}
        </n-button>
      </div>
      <n-ellipsis :line-clamp="3">
        {{ $t("userDescDefault") }}
      </n-ellipsis>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNavigator } from "@/hooks";
import { useMessage } from "naive-ui";
import type { UserInfo } from "@User/apis/user/types";
import { i18n } from "@/config";

// props
const props = defineProps<{ user: UserInfo }>();
// message
const message = useMessage();
// 导航钩子
const {
  user: { goUser },
} = useNavigator();

// 点击进入用户页
const onHandleClick = () => goUser(props.user.uid);

// 点击关注的回调
const onHandleFollow = () => {
  message.info(i18n.global.t("willBe"));
};
</script>

<style scoped lang="scss">
.user-item {
  padding: 5px 10px;
  display: flex;
  i,
  .n-avatar,
  span {
    cursor: pointer;
  }
  .n-avatar {
    min-width: 34px;
  }

  .user-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .header {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .n-ellipsis {
      word-break: break-all;
    }
  }
}
</style>
