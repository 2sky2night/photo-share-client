<template>
  <div
    class="history-item"
    @click="onHandleNav"
    :key="path">
    <div
      class="active-flag mr-10"
      :class="{ active: path === route.path }"></div>
    <span class="mr-10">{{ $t(title) }}</span>
    <n-icon
      @click.stop="onHandleDel"
      v-if="path !== '/'"
      size="10">
      <CloseOutlined />
    </n-icon>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { useRouteHistoryStore } from "@Admin/store";
import { CloseOutlined } from "@vicons/antd";

const router = useRouter();
const route = useRoute();
const props = defineProps<{ path: string; title: string }>();
const routeHistoryStore = useRouteHistoryStore();

// 导航
const onHandleNav = () => {
  router.push(props.path);
};

// 删除
const onHandleDel = () => {
  if (route.path === props.path) {
    router.push("/");
  }
  routeHistoryStore.deleteHistory(props.path);
};
</script>

<style scoped lang="scss">
.history-item {
  display: flex;
  flex-shrink: 0;
  padding: 2px 5px;
  align-items: center;
  background-color: var(--bg-color-1);
  cursor: pointer;
  border-radius: 2px;
  .active-flag {
    height: 10px;
    width: 10px;
    background-color: var(--border-color-1);
    border-radius: 50%;
    &.active {
      background-color: var(--primary-color);
    }
  }
  span {
    font-size: 12px;
    position: relative;
    top: 1px;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
