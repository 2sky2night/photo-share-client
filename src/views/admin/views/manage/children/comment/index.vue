<template>
  <div class="manage-comment page">
    <div class="table-container">
      <n-data-table
        remote
        striped
        ref="table"
        :columns="(columns as any)"
        :scroll-x="1800"
        :data="list"
        :loading="isLoading"
        :pagination="(pagination as any)"
        @update:sorter="onHandleSorterChange"
        @update:pageSize="onHandlePageSizeChange"
        @update:page="onHandlePageChange" />
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref, onBeforeMount, computed } from "vue";
import {
  getAllCommentsAPI,
  restoreCommentAPI,
  removeCommentAPI,
} from "@Admin/apis/comment";
import { useMessage, NButton, NPopconfirm } from "naive-ui";
import Time from "@/components/time/index.vue";
import type { DataTableSortState } from "naive-ui";
import type { CommentBase } from "@Admin/apis/comment/types";
import { i18n } from "@/config";

// TO-DO
// 过滤器功能

// 评论项
const list = ref<CommentBase[]>([]);
// 正在加载
const isLoading = ref(false);
// 是否降序
const isDesc = ref(false);
// 格式化降序值
const sortOrder = computed(() => {
  return isDesc.value ? "descend" : "ascend";
});
// 分页项
const pagination = ref({
  page: 1,
  itemCount: 0,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  prefix({ itemCount }: Record<"itemCount" | string, number>) {
    return i18n.global.t("totalIs", { num: itemCount });
  },
});
// message
const message = useMessage();
// cid列表项
const cidColumns = ref({
  title: "CID",
  key: "cid",
  sorter: true,
  sortOrder: sortOrder.value,
  width: 100,
});
// 渲染列表项
const columns = computed(() => [
  // @ts-ignore
  cidColumns.value,
  {
    title: "UID",
    key: "uid",
    width: 100,
  },
  {
    title: "PID",
    key: "pid",
    width: 100,
  },
  {
    title: i18n.global.t("content"),
    key: "content",
    width: 200,
  },
  {
    title: i18n.global.t("createdAt"),
    key: "createdAt",
    render(row: CommentBase) {
      return <Time timeStr={row.createdAt}></Time>;
    },
  },
  {
    title: i18n.global.t("deletedAt"),
    key: "deletedAt",
    render(row: CommentBase) {
      return row.deletedAt ? (
        <Time timeStr={row.deletedAt}></Time>
      ) : (
        i18n.global.t("noDataD")
      );
    },
  },
  {
    title: i18n.global.t("action"),
    key: "action",
    fixed: "right",
    render(row: CommentBase) {
      return (
        <>
          {row.deletedAt ? (
            <NPopconfirm onPositiveClick={() => onHandleRestore(row.cid)}>
              {{
                trigger: () => (
                  <NButton
                    size="tiny"
                    type="primary">
                    {i18n.global.t("restore")}
                  </NButton>
                ),
                default: () => (
                  <span>{i18n.global.t("restoreCommentTips")}</span>
                ),
              }}
            </NPopconfirm>
          ) : (
            <NPopconfirm onPositiveClick={() => onHandleDelete(row.cid)}>
              {{
                trigger: () => (
                  <NButton
                    size="tiny"
                    type="error">
                    {i18n.global.t("delete")}
                  </NButton>
                ),
                default: () => (
                  <span>{i18n.global.t("deleteCommentTips")}</span>
                ),
              }}
            </NPopconfirm>
          )}
          <NButton
            class="ml-5"
            size="tiny"
            type="info">
            {i18n.global.t("moreInfo")}
          </NButton>
        </>
      );
    },
  },
]);

// 获取数据
const onHandleGetData = async () => {
  isLoading.value = true;
  list.value.length = 0;
  const { page, pageSize } = pagination.value;
  const { data } = await getAllCommentsAPI({
    pageNum: page,
    pageSize: pageSize,
    desc: isDesc.value,
  });
  pagination.value.itemCount = data.total;
  data.list.forEach((item) => list.value.push(item));
  isLoading.value = false;
};

// 重置页码并加载
const onHanldeReset = () => {
  pagination.value.page = 1;
  onHandleGetData();
};

// 排序更新的回调
const onHandleSorterChange = (sorter: DataTableSortState) => {
  if (isLoading.value || !sorter) return;
  const { order } = sorter;
  if (order === "ascend") {
    isDesc.value = false;
  } else {
    isDesc.value = true;
  }
  cidColumns.value.sortOrder = sortOrder.value;
  // 加载数据
  onHandleGetData();
};

// 页码更新的回调
const onHandlePageChange = (pageNum: number) => {
  pagination.value.page = pageNum;
  onHandleGetData();
};

// 页长度更新的回调
const onHandlePageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
  onHanldeReset();
};

// 删除的回调
const onHandleDelete = (cid: number) => {
  removeCommentAPI(cid).then(
    () => {
      message.success(i18n.global.t("s_delete"));
      onHandleGetData();
    },
    () => {}
  );
};

// 恢复的回调
const onHandleRestore = async (cid: number) => {
  restoreCommentAPI(cid).then(
    () => {
      message.success(i18n.global.t("s_restore"));
      onHandleGetData();
    },
    () => {}
  );
};

// 加载数据
onBeforeMount(onHandleGetData);

defineOptions({ name: "ManageComment" });
</script>

<style scoped lang="scss">
.manage-comment {
  .table-container {
    padding: 15px;
  }
}
</style>
