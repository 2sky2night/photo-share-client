<template>
  <user-info-skeleton v-if="loading || userData === null"></user-info-skeleton>
  <div
    class="user-info-container"
    v-if="!loading && userData !== null">
    <div class="avatar mr-10">
      <n-icon v-if="userData.avatar === null">
        <user></user>
      </n-icon>
      <div
        class="avatar-content"
        v-else>
        <img :src="config.IMG_BASE_URL + userData.avatar" />
      </div>
    </div>
    <div class="info">
      <div class="top">
        <div class="username">{{ userData.username }}</div>
        <div class="more-data">
          <div class="data mb-5">
            <span>{{ $t("followData") }}</span>
          </div>
          <slot></slot>
        </div>
      </div>
      <div class="desc">
        <p>{{ $t("userDescDefault") }}</p>
      </div>
    </div>
    <div class="time sub-text">
      {{ $t("welcomeTip", { num: getDaysByDateStr(userData.createdAt) }) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from "@vicons/fa";
import UserInfoSkeleton from "@User/components/skeleton/user-info.vue";
import type { UserInfo as InfoType } from "@User/apis/user/types";
import { getDaysByDateStr } from "@/utils";
import { config } from "@/config";

// props
defineProps<{
  /**
   * 用户信息
   */
  userData: InfoType | null;
  /**
   * 正在加载
   */
  loading: boolean;
}>();

defineOptions({
  name: "UserInfo",
});
</script>

<style scoped lang="scss">
.user-info-container {
  color: var(--text-color-1);
  user-select: none;
  padding: 18px 15px;
  display: flex;
  position: relative;
  z-index: 1;
  .info {
    flex-grow: 1;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      .username {
        font-size: 20px;
        font-weight: 600;
      }
      .more-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        .data {
          span {
            // font-size: 13px;
          }
        }
      }
    }
  }
  .avatar {
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid var(--border-color-1);
    :deep(.n-icon) {
      display: flex;
      align-items: center;
      font-size: 80px;
      justify-content: center;
      width: 120px;
      height: 120px;
    }
    .avatar-content {
      width: 150px;
      height: 150px;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .time {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
  }
}
@media screen and (max-width: 650px) {
  .user-info-container {
    align-items: center;
    padding: 0;
    padding-bottom: 20px;
    .avatar {
      width: 80px;
      height: 80px;
      :deep(.n-icon) {
        font-size: 45px;
        width: 100%;
        height: 100%;
      }
      .avatar-content {
        width: 80px;
        height: 80px;
      }
    }
    .info {
      padding-bottom: 15px;
      .top {
        .username {
          font-size: 15px;
        }
        .more-data {
          .data {
            font-size: 12px;
          }
        }
      }
      .desc {
        margin-top: 10px;
        font-size: 13px;
      }
    }
  }
}
</style>
