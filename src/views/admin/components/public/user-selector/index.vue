<template>
  <div class="user-selector-container">
    <n-select
      remote
      style="width: 200px"
      :placeholder="$t('pleaseSelect')"
      :options="(usersOptions as any)"
      :render-label="renderLabel"
      :render-tag="renderSelectTag"
      :loading="isLoading"
      @scroll="handleScroll"
      @update:value="onHandleUidUpdate" />
  </div>
</template>

<script setup lang="tsx">
import { ref, computed, onBeforeMount } from "vue";
import { getAccountsAPI } from "@Admin/apis/user";
import { i18n } from "@/config";
import { styled } from "@styils/vue";
import Avatar from "@/components/public/avatar/index.vue";
import type { UserBase } from "@/apis/user/types";
import type { UserSelectorEmits, UserSelectorProps } from "./types";
import type { SelectRenderLabel, SelectRenderTag } from "naive-ui";
import { Roles } from "@/types/auth";

// props
const props = withDefaults(defineProps<UserSelectorProps>(), { role: Roles.User });
// emits
const emit = defineEmits<UserSelectorEmits>();
// 用户列表
const list = ref<UserBase[]>([]);
// 正在加载
const isLoading = ref(false);
// 分页数据
const pagination = ref({
  pageNum: 1,
  pageSize: 20,
});
// 是否还有更多用户数据?
let hasMore = false;
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

// 选择的用户下拉库更新的回调
const onHandleUidUpdate = (value: number | null) => {
  emit("update:uid", value);
};

// 加载User列表
const onHandleGetData = async () => {
  isLoading.value = true;
  const { data } = await getAccountsAPI({
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    desc: false,
    role: props.role,
  });
  hasMore = data.has_more;
  data.list.forEach((item) => list.value.push(item));
  isLoading.value = false;
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
  if (isLoading.value || !hasMore) return;
  if (target.scrollTop + target.clientHeight + 20 >= target.scrollHeight) {
    pagination.value.pageNum++;
    onHandleGetData();
  }
};

// 获取用户数据
onBeforeMount(onHandleGetData);

defineOptions({ name: "UserSelector" });
</script>
