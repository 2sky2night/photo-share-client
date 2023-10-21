<template>
  <div class="audit-photo admin-page">
    <div class="filter">过滤器，过滤某个用户，某种状态</div>
    <div class="table-container">
      <div class="table">
        <n-data-table
          remote
          striped
          :data="list"
          :columns="(colums as any)"
          :bordered="false"
          :min-height="300"
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
import { h, ref, onBeforeMount } from "vue";
import { getPhotoListAPI } from "@Admin/apis/photo";
import { NButton, NEllipsis } from "naive-ui";
import Time from "@/components/time/index.vue";
import { auditPhotoModal } from "@Admin/render";
import { i18n } from "@/config";
import type { Photo } from "@/apis/photo/types";
import { AuditStatus } from "@/types/photo";

// 列表
const list = ref<Photo[]>([]);
// 分页数据
const pagination = ref({
  page: 10,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  itemCount: 15,
});
// 审核状态映射
const statusTable = {
  [AuditStatus.PASS]: "passAudit",
  [AuditStatus.NO_PASS]: "unpassAudit",
  [AuditStatus.NO_AUDIT]: "notAudit",
};
// 正在加载
const isLoading = ref(false);
// 渲染表头
const renderColums = () => {
  return [
    {
      title: "PID",
      key: "pid",
      fixed: "left",
      width: 100,
    },
    {
      title: "TITLE",
      width: 150,
      key: "title",
    },
    {
      title: "CONTENT",
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
                  onClick() {
                    // 点击查看简介
                    console.log(row.content);
                  },
                },
                row.content
              ),
          }
        );
      },
    },
    {
      title: "PUBLISH_UID",
      key: "publish_uid",
    },
    {
      title: "CREATE_TIME",
      key: "createdAt",
      width: 150,
      render(row: Photo) {
        return h(Time, { timeStr: row.createdAt });
      },
    },
    {
      title: "VIEWS",
      key: "views",
    },
    {
      title: "AUDIT_UID",
      key: "audit_uid",
      render(row: Photo) {
        return h(
          "span",
          row.audit_uid ? row.audit_uid : i18n.global.t("noDataD")
        );
      },
    },
    {
      title: "AUDIT_DESC",
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
                {
                  onClick() {
                    // 点击查看简介
                    console.log(row.audit_desc);
                  },
                },
                row.audit_desc ? row.audit_desc : i18n.global.t("noDataD")
              ),
          }
        );
      },
    },
    {
      title: "AUDIT_TIME",
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
      title: "STATUS",
      key: "status",
      fixed: "right",
      width: 100,
      render(row: Photo) {
        return h("span", i18n.global.t(statusTable[row.status]));
      },
    },
    {
      title: "ACTION",
      key: "action",
      width: 200,
      fixed: "right",
      render(row: Photo) {
        return [
          h(NButton, { size: "tiny", type: "info" }, () =>
            h("span", "查看图片")
          ),
          h(
            NButton,
            {
              size: "tiny",
              type: "primary",
              class: "ml-5",
              async onClick(e: MouseEvent) {
                try {
                  // 操作成功，重新加载此页面
                  await auditPhotoModal(row, { x: e.pageX, y: e.pageY });
                } finally {
                  onHandleData();
                }
              },
            },
            () => h("span", "审核")
          ),
          h(NButton, { size: "tiny", type: "error", class: "ml-5" }, () =>
            h("span", "删除")
          ),
        ];
      },
    },
  ];
};
// 一行元组
const colums = renderColums();

// 获取数据
const onHandleData = async () => {
  isLoading.value = true;
  list.value.length = 0;
  const res = await getPhotoListAPI({
    pageNum: pagination.value.page,
    pageSize: pagination.value.pageSize,
  });
  res.data.list.forEach((item) => list.value.push(item));
  pagination.value.itemCount = res.data.total;
  isLoading.value = false;
};

// 页码更新的回调
const onHandlePageUpdate = (page: number) => {
  pagination.value.page = page;
  onHandleData();
};

// 页长度更新的回调
const onHandlePageSizeUpdate = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
  pagination.value.page = 1;
  onHandleData();
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
