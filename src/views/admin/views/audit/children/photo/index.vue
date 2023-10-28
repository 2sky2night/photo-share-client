<template>
  <div class="audit-photo admin-page">
    <photo-filter
      v-model:desc="filterData.desc"
      :loading="isLoading"
      v-model:uid="filterData.uid"
      v-model:status="filterData.status"
      @update:status="onHandleReset"
      @update:uid="onHandleReset"
      @update:desc="onHandleReset" />
    <div class="table-container">
      <div class="table">
        <n-data-table
          remote
          striped
          :data="list"
          :columns="(colums as any)"
          :bordered="false"
          :scroll-x="1800"
          :pagination="pagination"
          :loading="isLoading"
          @update:page="onHandlePageUpdate"
          @update:pageSize="onHandlePageSizeUpdate" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, ref, onBeforeMount, computed } from "vue";
import { getPhotoListAPI } from "@Admin/apis/photo";
import { NButton, NEllipsis, useDialog, NText, useMessage } from "naive-ui";
import Time from "@/components/time/index.vue";
import PhotoFilter from "./components/photo-filter/index.vue";
import { auditPhotoModal, photosPreviews } from "@Admin/render";
import { i18n } from "@/config";
import { AuditStatus } from "@/types/photo";
import type { Photo } from "@/apis/photo/types";

// dialog
const dialog = useDialog();
// 列表
const list = ref<Photo[]>([]);
// 分页数据
const pagination = ref({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  itemCount: 0,
  prefix({ itemCount }: { itemCount: number } & any) {
    return i18n.global.t("totalIs", { num: itemCount });
  },
});
// 正在加载
const isLoading = ref(false);
// 筛选条件
const filterData = ref<{
  uid: number | null;
  status: AuditStatus | null;
  desc: boolean;
}>({
  uid: null,
  status: null,
  desc: false,
});
// 审核状态映射
const statusTable = {
  [AuditStatus.PASS]: { message: "passAudit", type: "primary" },
  [AuditStatus.NO_PASS]: { message: "unpassAudit", type: "error" },
  [AuditStatus.NO_AUDIT]: { message: "notAudit", type: "default" },
};
// 渲染表头
const renderColums = () => {
  return computed(() => [
    {
      title: "PID",
      key: "pid",
      fixed: "left",
      width: 100,
    },
    {
      title: i18n.global.t("title"),
      width: 150,
      key: "title",
    },
    {
      title: i18n.global.t("photoDes"),
      key: "content",
      width: 150,
      render(row: Photo) {
        return h(
          NEllipsis,
          {
            tooltip: false,
            lineClamp: 3,
          },
          {
            default: () =>
              h(
                "span",
                {
                  style: "cursor: pointer;position:relative;top:5px",
                  onClick() {
                    // 点击查看简介
                    dialog.info({
                      title: i18n.global.t("photoDes"),
                      positiveText: i18n.global.t("confirm"),
                      content: row.content,
                    });
                  },
                },
                row.content
              ),
          }
        );
      },
    },
    {
      title: i18n.global.t("publishUid"),
      key: "publish_uid",
    },
    {
      title: i18n.global.t("createdTime"),
      key: "createdAt",
      width: 150,
      render(row: Photo) {
        return h(Time, { timeStr: row.createdAt });
      },
    },
    {
      title: i18n.global.t("views"),
      key: "views",
    },
    {
      title: i18n.global.t("auditUid"),
      key: "audit_uid",
      render(row: Photo) {
        return h(
          "span",
          row.audit_uid ? row.audit_uid : i18n.global.t("noDataD")
        );
      },
    },
    {
      title: i18n.global.t("auditDesc"),
      key: "audit_desc",
      render(row: Photo) {
        return h(
          NEllipsis,
          {
            tooltip: false,
            lineClamp: 3,
          },
          {
            default: () =>
              h(
                "span",
                row.audit_desc
                  ? {
                      style: "cursor: pointer;position:relative;top:5px",
                      onClick() {
                        // 点击查看简介
                        dialog.info({
                          title: i18n.global.t("auditDesc"),
                          positiveText: i18n.global.t("confirm"),
                          content: row.audit_desc as string,
                        });
                      },
                    }
                  : null,
                row.audit_desc ? row.audit_desc : i18n.global.t("noDataD")
              ),
          }
        );
      },
    },
    {
      title: i18n.global.t("auditTime"),
      key: "audit_time",
      width: 150,
      render(row: Photo) {
        const timeStr = row.audit_time;
        return timeStr
          ? h(Time, { timeStr: timeStr })
          : i18n.global.t("noDataD");
      },
    },
    {
      title: i18n.global.t("status"),
      key: "status",
      fixed: "right",
      width: 100,
      render(row: Photo) {
        return h(
          NText,
          { style: "font-weight:600", type: statusTable[row.status].type },
          () => i18n.global.t(statusTable[row.status].message)
        );
      },
    },
    {
      title: i18n.global.t("action"),
      key: "action",
      width: 200,
      fixed: "right",
      render(row: Photo) {
        return [
          h(
            NButton,
            {
              size: "tiny",
              type: "info",
              onClick() {
                photosPreviews(row.photos.map((item) => item.url));
              },
            },
            () => h("span", i18n.global.t("lookPhotos"))
          ),
          h(
            NButton,
            {
              size: "tiny",
              type: "primary",
              class: "ml-5",
              onClick(e: MouseEvent) {
                // 操作成功，重新加载此页面
                auditPhotoModal(row, { x: e.pageX, y: e.pageY }).then(
                  onHandleData,
                  () => {}
                );
              },
            },
            () => h("span", i18n.global.t("audit"))
          ),
          h(
            NButton,
            {
              onClick: onHandleDelete,
              size: "tiny",
              type: "error",
              class: "ml-5",
            },
            () => h("span", i18n.global.t("delete"))
          ),
        ];
      },
    },
  ]);
};
// message
const message = useMessage();
// 一行元组
const colums = renderColums();

// 删除的回调
const onHandleDelete = () => {
  message.info(i18n.global.t("willBe"));
};

// 获取数据
const onHandleData = async () => {
  isLoading.value = true;
  list.value.length = 0;
  const res = await getPhotoListAPI({
    pageNum: pagination.value.page,
    pageSize: pagination.value.pageSize,
    ...filterData.value,
  });
  res.data.list.forEach((item) => list.value.push(item));
  pagination.value.itemCount = res.data.total;
  isLoading.value = false;
};

// 重置加载
const onHandleReset = () => {
  pagination.value.page = 1;
  onHandleData();
};

// 页码更新的回调
const onHandlePageUpdate = (page: number) => {
  pagination.value.page = page;
  onHandleData();
};

// 页长度更新的回调
const onHandlePageSizeUpdate = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
  onHandleReset();
};

onBeforeMount(onHandleData);

defineOptions({ name: "AuditPhoto" });
</script>

<style scoped lang="scss">
.audit-photo {
  .table-container {
    display: flex;
    align-items: center;
    .table {
      width: 300px;
      flex-grow: 1;
    }
  }
}
</style>
