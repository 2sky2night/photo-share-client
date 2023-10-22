<template>
  <div class="filter-container">
    <div class="item">
      <div class="title mr-10">{{ $t("user") }}</div>
      <n-select
        remote
        style="width: 200px"
        :placeholder="$t('pleaseSelect')"
        :options="(usersOptions as any)"
        :render-label="renderLabel"
        :render-tag="renderSelectTag"
        :loading="loading"
        @scroll="handleScroll"
        @update:value="onHandleUidUpdate" />
    </div>
    <div class="item">
      <div class="title mr-10">{{ $t("audit") }}</div>
      <n-select
        style="width: 200px"
        :placeholder="$t('pleaseSelect')"
        :loading="loading"
        :options="(statusOptions as any)"
        @update:value="onHandleStatusUpdate"
        :value="status" />
    </div>
    <div class="item">
      <div class="title mr-10">{{ $t("desc") }}</div>
      <n-switch
        :loading="loading"
        :value="desc"
        @update:value="onHandleDescUpdate">
      </n-switch>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref, computed, onBeforeMount } from "vue";
import { getUsersAPI } from "@Admin/apis/user";
import { i18n } from "@/config";
import { styled } from "@styils/vue";
import Avatar from "@/components/public/avatar/index.vue";
import type { PhotoFilterProps, PhotoFilterEmits } from "./types";
import type { UserBase } from "@/apis/user/types";
import type { SelectRenderLabel, SelectRenderTag } from "naive-ui";
import { AuditStatus } from "@/types/photo";

// props
defineProps<PhotoFilterProps>();
// emits
const emit = defineEmits<PhotoFilterEmits>();
// 用户列表
const list = ref<UserBase[]>([]);
// 审核状态下拉选择框
const statusOptions = computed(() => [
  {
    label: i18n.global.t("all"),
    value: null,
  },
  {
    label: i18n.global.t("passAudit"),
    value: AuditStatus.PASS,
  },
  {
    label: i18n.global.t("unpassAudit"),
    value: AuditStatus.NO_PASS,
  },
  {
    label: i18n.global.t("notAudit"),
    value: AuditStatus.NO_AUDIT,
  },
]);
// 分页数据
const pagination = ref({
  pageNum: 1,
  pageSize: 20,
  isLoading: false,
});
// 用户下拉选择列表
const usersOptions = computed(() => {
  return [
    { label: i18n.global.t("all"), value: null },
    ...list.value.map((ele) => ({ label: ele.username, value: ele.uid })),
  ];
});
// 渲染选择用户容器组件
const LabelContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "5px 0",
});
// 渲染选择好的用户容器组件
const TagContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  transform: "scale(.8)",
  transformOrigin: "left center",
});
// 是否还有更多用户数据?
let hasMore = false;

// 审核状态下拉框更新的回调
const onHandleStatusUpdate = (value: AuditStatus | null) => {
  emit("update:status", value);
};

// 选择的用户下拉库更新的回调
const onHandleUidUpdate = (value: number | null) => {
  emit("update:uid", value);
};

// 排序方式更新的回调
const onHandleDescUpdate = (value: boolean) => {
  emit("update:desc", value);
};

// 加载User列表
const onHandleGetData = async () => {
  pagination.value.isLoading = true;
  const { data } = await getUsersAPI({
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    desc: false,
  });
  hasMore = data.has_more;
  data.list.forEach((item) => list.value.push(item));
  pagination.value.isLoading = false;
};

// 渲染下拉选择项中的每一个用户
const renderLabel: SelectRenderLabel = (option) => {
  const item = list.value.find((user) => user.uid === option.value);
  if (item) {
    return (
      <LabelContainer>
        <Avatar
          round
          size={30}
          src={item.avatar}
          class="mr-5"></Avatar>
        <div>{item.username}</div>
      </LabelContainer>
    );
  } else {
    return i18n.global.t("all");
  }
};

// 渲染过滤用户的选择器值
const renderSelectTag: SelectRenderTag = ({ option }) => {
  const item = list.value.find((user) => user.uid === option.value);
  if (item) {
    return (
      <TagContainer>
        <Avatar
          round
          size={25}
          src={item.avatar}
          class="mr-5"
        />
        <div>{item.username}</div>
      </TagContainer>
    );
  } else {
    return i18n.global.t("all");
  }
};

// 滚动的回调
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  if (pagination.value.isLoading || !hasMore) return;
  if (target.scrollTop + target.clientHeight + 20 >= target.scrollHeight) {
    pagination.value.pageNum++;
    onHandleGetData();
  }
};

// 获取用户数据
onBeforeMount(onHandleGetData);

defineOptions({ name: "PhotoFilter" });
</script>

<style scoped lang="scss">
.filter-container {
  display: flex;
  padding: 10px;
  .item {
    align-items: center;
    display: flex;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
