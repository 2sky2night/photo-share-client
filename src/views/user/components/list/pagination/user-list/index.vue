<template>
  <div class="user-list-container">
    <template v-if="pagination.isLoading">
      <user-list-skeleton :length="10"></user-list-skeleton>
      <div class="pagination">
        <n-pagination
          :page="pagination.pageNum"
          :page-size="pagination.pageSize"
          :item-count="pagination.total" />
      </div>
    </template>
    <template v-else>
      <template v-if="pagination.total">
        <div class="list">
          <user-item
            v-for="item in list"
            :key="item.uid"
            :user="item" />
        </div>
        <div class="pagination">
          <n-pagination
            :page="pagination.pageNum"
            :page-size="pagination.pageSize"
            :item-count="pagination.total"
            @update:page="onHandleUpdatePage"
            @update:page-size="onHandleUpdateSize" />
        </div>
      </template>
      <template v-else>
        <div class="empty">
          <empty :desc="$t('noData', { title: $t('user') })"></empty>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch } from "vue";
import UserItem from "@User/components/item/user-item/index.vue";
import UserListSkeleton from "@User/components/skeleton/user-list.vue";
import type { UserListResponse_ER } from "@/apis/search/types";
import type { UserInfo } from "@User/apis/user/types";
import type { UserListIns } from "./types";

// props
const props = withDefaults(
  defineProps<{
    /**
     * 获取数据的API
     */
    cb: (pageNum: number, pageSize: number) => Promise<UserListResponse_ER>;
    pageNum?: number;
    pageSize?: number;
  }>(),
  { pageNum: 1, pageSize: 20 }
);
// emit
const emit = defineEmits<{
  "update:pageNum": [value: number];
  "update:pageSize": [value: number];
}>();
// 分页数据
const pagination = ref({
  pageNum: props.pageNum,
  pageSize: props.pageSize,
  total: 0,
  isLoading: false,
});
// 列表
const list = ref<UserInfo[]>([]);

// 获取数据
const onHandleGetData = async () => {
  pagination.value.isLoading = true;
  list.value.length = 0;
  const { pageNum, pageSize } = pagination.value;
  const result = await props.cb(pageNum, pageSize);
  pagination.value.total = result.total;
  result.list.forEach((ele) => list.value.push(ele));
  pagination.value.isLoading = false;
};

// 重置加载
const onHandleReset = () => {
  emit("update:pageNum", 1);
  if (pagination.value.pageNum === 1) {
    // 强制加载
    onHandleGetData();
  }
};

// 页码更新的回调
const onHandleUpdatePage = (page: number) => {
  emit("update:pageNum", page);
};

// 页长度更新的回调
const onHandleUpdateSize = (pageSize: number) => {
  emit("update:pageSize", pageSize);
};

// 外部分页数据更新，同步内部分页数据
watch(
  () => [props.pageNum, props.pageSize],
  ([num, size]) => {
    pagination.value.pageNum = num;
    pagination.value.pageSize = size;
    // 重新加载数据
    onHandleGetData();
  }
);

// 暴露方法
defineExpose<UserListIns>({ onHandleReset });

// 加载数据
onBeforeMount(onHandleGetData);

defineOptions({
  name: "UserList",
});
</script>

<style scoped lang="scss">
.user-list-container {
  .empty {
    padding: 20px 0;
  }
  .list {
    min-height: 450px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    @media screen and (max-width: 650px) {
      display: flex;
      flex-direction: column;
      > div {
        margin-bottom: 10px;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
}
</style>
