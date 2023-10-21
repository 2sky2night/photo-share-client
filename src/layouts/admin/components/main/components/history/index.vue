<template>
  <div class="hisory-container">
    <button
      class="action-btn"
      @click="onHandleLeft">
      <n-icon><LeftOutlined /></n-icon>
    </button>
    <!--主容器-->
    <div
      class="list-container"
      ref="containerDOM">
      <!--列表容器-->
      <div
        class="content"
        ref="listDOM"
        :style="listStyle">
        <history-item
          v-for="item in history"
          :key="item.path"
          :path="item.path"
          :title="item.title" />
      </div>
    </div>
    <button
      class="action-btn"
      @click="onHandleRight">
      <n-icon><RightOutlined /></n-icon>
    </button>
    <n-dropdown
      trigger="click"
      :options="options"
      @select="onHandleSelect">
      <button class="action-btn ml-5">
        <n-icon><CloseCircleOutlined /></n-icon>
      </button>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  watch,
  nextTick,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useRouteHistoryStore } from "@Admin/store";
import HistoryItem from "./components/history-item.vue";
import { LeftOutlined, RightOutlined, CloseCircleOutlined } from "@vicons/antd";
import { i18n } from "@/config";
import { pubsub } from "@/utils";
import type { CSSProperties } from "vue";

// 路由对象
const router = useRouter();
// 路由元信息
const route = useRoute();
// 历史记录仓库
const routeHistoryStore = useRouteHistoryStore();
// 历史记录
const { history } = storeToRefs(routeHistoryStore);
// 列表容器
const listDOM = ref<HTMLDivElement | null>(null);
// 视图容器
const containerDOM = ref<HTMLDivElement | null>(null);
// 左右的偏移量
const offsetX = ref(0);
// 列表容器的style
const listStyle = computed<CSSProperties>(() => {
  return {
    transform: `translateX(${offsetX.value}px)`,
  };
});
// 每次移动多少偏移量?
const offsetWidth = 50;
// 操作枚举
enum Actions {
  DEL_ALL = "del-all",
  DEL_OTHER = "del-other",
}
// 删除的下拉菜单
const options = computed(() => [
  {
    label: i18n.global.t("RHistoryDelAll"),
    key: Actions.DEL_ALL,
  },
  {
    label: i18n.global.t("RHistoryDelAllKeepCur"),
    key: Actions.DEL_OTHER,
  },
]);

// 点击左移
const onHandleLeft = () => {
  if (Math.abs(offsetX.value) > offsetWidth) {
    // 若还可以移动
    offsetX.value += offsetWidth;
  } else {
    // 不能移动，偏移量为0
    offsetX.value = 0;
  }
};

// 点击右移
const onHandleRight = () => {
  const container = containerDOM.value;
  if (container) {
    const { scrollWidth, clientWidth } = container;
    if (Math.abs(offsetX.value) < scrollWidth - clientWidth) {
      offsetX.value -= offsetWidth;
    } else {
      offsetX.value = -(scrollWidth - clientWidth);
    }
  }
};

// 窗口变化的回调
const onHandleResize = () => {
  if (containerDOM.value) {
    containerDOM.value.scroll(0, 0);
    offsetX.value = 0;
  }
};

// 选择下拉框的回调
const onHandleSelect = (key: Actions) => {
  switch (key) {
    case Actions.DEL_ALL:
      routeHistoryStore.deleteAllHistroy();
      router.push("/");
      break;
    case Actions.DEL_OTHER:
      routeHistoryStore.deleteOtherHistroy(route.path);
      break;
  }
};

// 路由变化，添加历史记录
watch(
  () => route.path,
  () => {
    routeHistoryStore.addHistory({
      path: route.path,
      title: route.meta?.title ? route.meta.title : route.path,
    });

    // 实现激活就让偏移量为对应历史记录元素的偏移位置
    //  1.若当前历史记录未被显示，则移动偏移量，显示被高亮的历史记录项目
    //  2.若当前历史记录被显示了，无任何操作
    nextTick(() => {
      if (listDOM.value && containerDOM.value) {
        const { scrollWidth, clientWidth } = containerDOM.value;
        const index = history.value.findIndex((ele) => ele.path === route.path);
        const item = listDOM.value.children[index] as HTMLElement;
        const { offsetLeft } = item;
        if (item) {
          // 当前列表容器显示的末尾偏移量
          const right = Math.abs(offsetX.value) + clientWidth;
          if (offsetLeft >= Math.abs(offsetX.value) && offsetLeft <= right) {
            // 当前历史记录出现在了视口中，无操作
          } else {
            // 当前历史记录未出现在视口中，主动将偏移量设置过去
            if (offsetLeft > scrollWidth - clientWidth) {
              offsetX.value = -(scrollWidth - clientWidth);
            } else {
              offsetX.value = -item.offsetLeft;
            }
          }
        }
      }
    });
  },
  { immediate: true }
);

onMounted(() => {
  // 监听窗口变化
  pubsub.on("window.resize", onHandleResize);
  if (containerDOM.value) {
    containerDOM.value.addEventListener("scroll", function (e) {
      this.scroll(0, 0);
      e.preventDefault();
    });
  }
});

onBeforeUnmount(() => {
  // 移除事件监听窗口变化的监听
  pubsub.removeOn("window.resize", onHandleResize);
});

defineOptions({ name: "HistoryContainer" });
</script>

<style scoped lang="scss">
.hisory-container {
  border-bottom: var(--border);
  height: var(--history-heigth);
  box-sizing: border-box;
  background-color: var(--bg-color-2);
  display: flex;
  padding: 0 1px;
  box-sizing: border-box;
  .action-btn {
    width: 30px;
    background-color: var(--bg-color-1);
    border: none;
    height: 100%;
    flex-shrink: 0;
    cursor: pointer;
    &:hover i {
      color: var(--primary-color);
    }
    i {
      transition: color var(--time-normal);
      position: relative;
      top: 2px;
    }
  }
  .list-container {
    flex-grow: 1;
    overflow-x: auto;
    height: 100%;
    position: relative;
    margin: 0 10px;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .content {
      transition: transform var(--time-normal);
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
