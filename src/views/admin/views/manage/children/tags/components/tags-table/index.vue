<template>
  <div class="tags-table-container">
    <div class="container">
      <n-data-table
        remote
        ref="table"
        :scroll-x="1800"
        :columns="columns"
        :data="list"
        :loading="isLoading"
        :pagination="pagination"
        @update:sorter="onHandleSorterChange"
        @update:page-size="onHandlePageSizeChange"
        @update:page="onHandlePageChange" />
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref, onBeforeMount, computed } from "vue";
import UserSelector from "@Admin/components/public/user-selector/index.vue";
import Avatar from "@/components/public/avatar/index.vue";
import Time from "@/components/time/index.vue";
import { NButton, NPopconfirm, useMessage } from "naive-ui";
import { getTagsListAPI, removeTagsAPI } from "@Admin/apis/photo";
import { i18n } from "@/config";
import { editTagsModal } from "@Admin/render";
import type { Tags } from "@Admin/apis/photo/types";
import type { DataTableColumn, DataTableSortState } from "naive-ui";
import type { TagsTableInst } from "./types";

// 列表数据
const list = ref<Tags[]>([]);
// 正在加载
const isLoading = ref(false);
// 升序或降序
let desc = false;
// tid列表项
const tidColumn: DataTableColumn = {
  title: "TID",
  key: "tid",
  sorter: true,
  sortOrder: "ascend",
};
// tid列表项响应式数据(为了数据劫持)
const tidColumnRef = ref(tidColumn);
// 选择的创建人
let cid: number | null = null;
// 创建人列表项
const cidColumn: Record<string, any> = {
  title: i18n.global.t("creator"),
  key: "creator_uid",
  filter: "default",
  filterOptionValue: null,
  renderFilterMenu() {
    const handler = (uid: number | null) => {
      cidColumRef.value.filterOptionValue = uid;
      onHandleFilter(uid);
    };
    return (
      <UserSelector
        uid={cidColumRef.value.filterOptionValue}
        style="padding:10px"
        role={null}
        onUpdate:uid={handler}
      />
    );
  },
  render(row: Tags) {
    return <Avatar src={row.creator.avatar}></Avatar>;
  },
};
// 创建人列表项响应式数据(为了数据劫持)
const cidColumRef = ref(cidColumn);
// 渲染列表项
const columns = computed<DataTableColumn<Tags>[]>(() => [
  tidColumn,
  {
    title: i18n.global.t("tagsNameZH"),
    key: "name_zh",
  },
  {
    title: i18n.global.t("tagsNameEN"),
    key: "name_en",
  },
  {
    title: i18n.global.t("descZH"),
    key: "description_zh",
    render(row) {
      return row.description_zh ? row.description_zh : i18n.global.t("noDataD");
    },
  },
  {
    title: i18n.global.t("descEN"),
    key: "description_en",
    render(row) {
      return row.description_en ? row.description_en : i18n.global.t("noDataD");
    },
  },
  cidColumn as any,
  {
    title: i18n.global.t("createdAt"),
    key: "createdAt",
    render(row) {
      return <Time timeStr={row.createdAt}></Time>;
    },
  },
  {
    title: i18n.global.t("updatedAt"),
    key: "updatedAt",
    render(row) {
      return row.updatedAt ? (
        <Time timeStr={row.updatedAt} />
      ) : (
        i18n.global.t("noDataD")
      );
    },
  },
  {
    title: i18n.global.t("action"),
    fixed: "right",
    render(row) {
      const handleDelete = () => {
        onHandleDelete(row.tid);
      };
      const handleUpdate = (e: MouseEvent) => {
        onHandleUpdate(row, { x: e.x, y: e.y });
      };
      return (
        <>
          <NButton
            size="tiny"
            type="info"
            onClick={handleUpdate}>
            {i18n.global.t("edit")}
          </NButton>
          <NPopconfirm onPositiveClick={handleDelete}>
            {{
              trigger: () => (
                <NButton
                  size="tiny"
                  type="error"
                  class="ml-5">
                  {i18n.global.t("delete")}
                </NButton>
              ),
              default: () => {
                return <span>{i18n.global.t("deleteTagsTips")}</span>;
              },
            }}
          </NPopconfirm>
        </>
      );
    },
  },
]);
// 分页数据
const pagination = ref({
  page: 1,
  itemCount: 0,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
});
// message
const message = useMessage();

// 获取数据
const onHandleGetData = async () => {
  isLoading.value = true;
  const { page, pageSize } = pagination.value;
  list.value.length = 0;
  const result = await getTagsListAPI(
    page,
    pageSize,
    desc,
    cid !== null ? cid : undefined
  );
  result.data.list.forEach((item) => list.value.push(item));
  pagination.value.itemCount = result.data.total;
  isLoading.value = false;
};

// 用户过滤器更新
const onHandleFilter = (uid: number | null) => {
  if (isLoading.value) return;
  cid = uid;
  resetTable();
};

// id排序更新
const onHandleSorterChange = ({ order }: DataTableSortState) => {
  if (isLoading.value) return;
  if (order === "ascend") {
    // 当前是降序
    tidColumnRef.value.sortOrder = "descend";
  } else {
    // 当前是升序
    tidColumnRef.value.sortOrder = "ascend";
  }
  desc = !desc;
  resetTable();
};

// 页长度更新
const onHandlePageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
  resetTable();
};

// 页码更新
const onHandlePageChange = (page: number) => {
  pagination.value.page = page;
  onHandleGetData();
};

// 重置页码重新获取数据
const resetTable = () => {
  pagination.value.page = 1;
  onHandleGetData();
};

// 删除
const onHandleDelete = async (tid: number) => {
  await removeTagsAPI(tid);
  message.success(i18n.global.t("s_delete"));
  resetTable();
};

// 更新
const onHandleUpdate = (tags: Tags, offset: { x: number; y: number }) => {
  // 编辑标签，成功编辑重新加载当前页
  editTagsModal(tags, offset).then(onHandleGetData, () => {});
};

// 初始化
onBeforeMount(onHandleGetData);

// 向外暴露的api
defineExpose<TagsTableInst>({
  resetTable,
});

defineOptions({
  name: "TagsTable",
});
</script>

<style scoped lang="scss">
.tags-table-container {
  padding: 0 10px;
}
</style>
