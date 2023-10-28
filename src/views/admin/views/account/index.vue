<template>
  <div class="account-page admin-page">
    <div class="tools">
      <account-filter
        v-model:role="filerData.role"
        v-model:keywords="filerData.keywords"
        v-model:desc="filerData.desc"
        @update:desc="onHandleReset"
        @update:keywords="onHandleReset"
        @update:role="onHandleReset" />
      <n-button
        type="primary"
        class="mb-10"
        @click="onHandleCreateAccount">
        {{ $t("addUser") }}
      </n-button>
    </div>
    <div class="table-container">
      <n-data-table
        remote
        striped
        :loading="pagination.isLoading"
        :columns="columns"
        :data="list"
        :pagination="pagination"
        :bordered="false"
        @update:page="onHandlePageUpdate"
        @update:pageSize="onHandlePageSizeUpdate" />
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { NButton, useMessage } from "naive-ui";
import { useUserStore } from "@/store";
import Avatar from "@/components/public/avatar/index.vue";
import Time from "@/components/time/index.vue";
import AccountFilter from "./components/account-filter/index.vue";
import RoleText from "@Admin/components/public/role-text/index.vue";
import { getAccountsAPI } from "@Admin/apis/user";
import { searchAccountsAPI } from "@Admin/apis/search";
import { createAccountModal, editAccountModal } from "@Admin/render";
import { i18n } from "@/config";
import type { UserBase, UserInfo } from "@/apis/user/types";
import type { DataTableColumns } from "naive-ui";
import type { AccountFilterProps } from "./components/account-filter/types";

// TO-DO
// 1.删除用户？

// router
const router = useRouter();
// 用户仓库
const userStore = useUserStore();
// 用户列表
const list = ref<UserBase[]>([]);
// 过滤器数据
const filerData = ref<AccountFilterProps>({
  keywords: "",
  role: null,
  desc: false,
});
// 分页数据
const pagination = ref({
  page: 1,
  pageSize: 5,
  pageSizes: [5, 10, 20],
  isLoading: false,
  itemCount: 0,
  showSizePicker: true,
  prefix({ itemCount }: Record<string, any>) {
    return i18n.global.t("totalIs", { num: itemCount });
  },
});
// message
const message = useMessage();
// 表格渲染配置项
const columns = computed<DataTableColumns<UserBase>>(() => [
  {
    title: "UID",
    key: "uid",
  },
  {
    title: i18n.global.t("username"),
    key: "username",
  },
  {
    title: i18n.global.t("avatar"),
    key: "avatar",
    render(row) {
      return (
        <Avatar
          src={row.avatar}
          size={30}></Avatar>
      );
    },
  },
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
      return <Time timeStr={row.updatedAt}></Time>;
    },
  },
  {
    title: i18n.global.t("role"),
    key: "role",
    render(row) {
      return <RoleText role={row.role}></RoleText>;
    },
  },
  {
    title: i18n.global.t("action"),
    key: "action",
    render(row) {
      return (
        <>
          <NButton
            size="tiny"
            type="info"
            onClick={(e) => {
              onHandleEditAccount(row, { x: e.x, y: e.y });
            }}>
            {i18n.global.t("edit")}
          </NButton>
          <NButton
            size="tiny"
            class="ml-5"
            type="error"
            onClick={onHandleDeleteAccount}>
            {i18n.global.t("delete")}
          </NButton>
        </>
      );
    },
  },
]);

// 获取用户列表
const onHandleGetData = async () => {
  pagination.value.isLoading = true;
  list.value.length = 0;
  const { desc, keywords, role } = filerData.value;
  const { page: pageNum, pageSize } = pagination.value;
  const { data } = keywords.length
    ? await searchAccountsAPI({
        pageNum,
        pageSize,
        desc,
        role,
        keywords,
      })
    : await getAccountsAPI({
        pageNum,
        pageSize,
        desc,
        role,
      });
  pagination.value.itemCount = data.total;
  data.list.forEach((user) => list.value.push(user));
  pagination.value.isLoading = false;
};

// 页码更新的回调
const onHandlePageUpdate = (page: number) => {
  pagination.value.page = page;
  onHandleGetData();
};

// 重置页码
const onHandleReset = () => {
  pagination.value.page = 1;
  onHandleGetData();
};

// 页长度更新的回调
const onHandlePageSizeUpdate = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
  onHandleReset();
};

// 创建用户的回调
const onHandleCreateAccount = (e: MouseEvent) => {
  createAccountModal({ x: e.clientX, y: e.clientY }).then(
    () => {
      // 创建成功的回调
      // 重新加载
      onHandleReset();
      message.success(i18n.global.t("s_createAccount"));
    },
    () => {
      console.log("cancel");
    }
  );
};

// 编辑用户的回调
const onHandleEditAccount = (
  user: UserInfo,
  offset: { x: number; y: number }
) => {
  if (userStore.userInfo.uid === user.uid) {
    // 在编辑自己的信息，重定向到编辑页
    router.push("/edit");
  } else {
    // 编辑成功，重新加载当前页
    editAccountModal(Object.assign({}, user), offset).then(
      () => {
        message.success(i18n.global.t("s_updateInfo"));
        onHandleGetData();
      },
      () => {}
    );
  }
};

// 删除用户
const onHandleDeleteAccount = () => {
  message.info(i18n.global.t("willBe"));
};

// 加载用户数据
onBeforeMount(onHandleGetData);

defineOptions({ name: "UserPage" });
</script>

<style lang="scss" scoped>
.tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
