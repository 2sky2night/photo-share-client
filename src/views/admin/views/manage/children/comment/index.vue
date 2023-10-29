<template>
  <div class="manage-comment admin-page">
    <comment-filter
      v-model:is-dele="filterData.isDele"
      v-model:keywords="filterData.keywords"
      v-model:uid="filterData.uid"
      v-model:pid="filterData.pid"
      @filter="onHanldeReset" />
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
import { useMessage, NButton, NPopconfirm } from "naive-ui";
import CommentFilter from "./components/comment-filter/index.vue";
import Time from "@/components/time/index.vue";
import {
  getAllCommentsAPI,
  restoreCommentAPI,
  removeCommentAPI,
} from "@Admin/apis/comment";
import { i18n } from "@/config";
import { commentMoreModal } from "@/views/admin/render";
import type { DataTableSortState } from "naive-ui";
import type { CommentBase, AllCommentQuery } from "@Admin/apis/comment/types";
import type { CommentFilterProps } from "./components/comment-filter/types";

// 评论项
const list = ref<CommentBase[]>([]);
// 过滤器数据
const filterData = ref<CommentFilterProps>({
  isDele: null,
  keywords: "",
  uid: null,
  pid: null,
});
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
    title: i18n.global.t("updatedAt"),
    key: "updatedAt",
    render(row: CommentBase) {
      return <Time timeStr={row.updatedAt}></Time>;
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
    width: 200,
    render(row: CommentBase) {
      const handleCheckMore = (e: MouseEvent) =>
        onHandleGetInfo(row.cid, { x: e.x, y: e.y });
      const handleDelete = () => onHandleDelete(row.cid);
      const handleRestore = () => onHandleRestore(row.cid);
      return (
        <>
          {row.deletedAt ? (
            <NPopconfirm onPositiveClick={handleRestore}>
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
            <NPopconfirm onPositiveClick={handleDelete}>
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
            type="info"
            onClick={handleCheckMore}>
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
  const { keywords, uid, pid, isDele } = filterData.value;
  const query: AllCommentQuery = {
    pageNum: page,
    pageSize: pageSize,
    desc: isDesc.value,
  };
  if (keywords) {
    query.keywords = keywords;
  }
  if (uid !== null) {
    query.uid = uid;
  }
  if (pid !== null) {
    query.pid = pid;
  }
  if (isDele !== null) {
    query.isDele = isDele;
  }
  const { data } = await getAllCommentsAPI(query);
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

// 点击查看某个评论的详情信息的回调
const onHandleGetInfo = (cid: number, offset: { x: number; y: number }) => {
  commentMoreModal(cid, offset);
};

// 加载数据
onBeforeMount(onHandleGetData);

defineOptions({ name: "ManageComment" });
</script>
