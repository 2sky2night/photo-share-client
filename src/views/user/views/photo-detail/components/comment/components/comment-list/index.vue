<template>
  <div class="comment-list">
    <!--首次加载-->
    <template v-if="pagination.firstLoading">
      <div class="header">
        <span class="title">{{ $t("comment") }}</span>
      </div>
      <comment-list-skeleton
        :length="pagination.pageSize"></comment-list-skeleton>
    </template>
    <template v-else>
      <div class="header">
        <div class="text">
          <span class="title">{{ $t("comment") }}</span>
          <span class="ml-5 total"
            >({{ $t("total") }} {{ pagination.total }} {{}})</span
          >
        </div>
        <n-switch
          :loading="pagination.firstLoading || pagination.isLoading"
          v-model:value="pagination.desc"
          @update:value="onHandleOrder">
          <template #checked>
            {{ $t("desc") }}
          </template>
          <template #unchecked>
            {{ $t("asc") }}
          </template>
        </n-switch>
      </div>
      <!--正在加载-->
      <template v-if="pagination.isLoading">
        <comment-list-skeleton
          :length="pagination.pageSize"></comment-list-skeleton>
        <div class="pagination">
          <n-pagination
            :item-count="pagination.total"
            :page="pagination.page"
            :page-size="pagination.pageSize" />
        </div>
      </template>
      <template v-else>
        <!--有评论-->
        <template v-if="list.length">
          <div class="list-container">
            <comment
              v-for="item in list"
              :comment="item"
              :key="item.cid"
              v-model:is-liked="item.is_liked"
              v-model:like-count="item.like_count"></comment>
          </div>
          <div class="pagination">
            <n-pagination
              :item-count="pagination.total"
              @update:page="onHandlePageChange"
              :page="pagination.page"
              :page-size="pagination.pageSize" />
          </div>
        </template>
        <!--无评论-->
        <template v-else>
          <empty :desc="$t('noData', { title: $t('comment') })"></empty>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, onBeforeMount, onBeforeUnmount } from "vue";
import Comment from "@User/components/item/comment-item/index.vue";
import CommentListSkeleton from "@User/components/skeleton/comment-list.vue";
import { getCommentAPI } from "@User/apis/photo";
import { Comment as CommentType } from "@User/apis/photo/types";
import { pubsub } from "@/utils";

// props
const props = defineProps<{ pid: number }>();
// 分页数据
const pagination = reactive({
  page: 1,
  pageSize: 10,
  isLoading: false,
  total: 0,
  firstLoading: false,
  desc: true,
});
// 评论数据
const list = reactive<CommentType[]>([]);

// 获取数据
const onHandleGetData = async () => {
  pagination.isLoading = true;
  list.length = 0;
  const res = await getCommentAPI(
    props.pid,
    pagination.page,
    pagination.pageSize,
    pagination.desc
  );
  pagination.total = res.data.total;
  res.data.list.forEach((ele) => list.push(ele));
  pagination.isLoading = false;
};

// 页码更新
const onHandlePageChange = (page: number) => {
  pagination.page = page;
  onHandleGetData();
};

// 发送评论了重新加载整个评论列表
const onHandlePostComment = async () => {
  pagination.page = 1;
  pagination.firstLoading = true;
  await onHandleGetData();
  pagination.firstLoading = false;
};

// 排序更新的回调
const onHandleOrder = async () => {
  pagination.page = 1;
  pagination.firstLoading = true;
  await onHandleGetData();
  pagination.firstLoading = false;
};

// 加载数据
onBeforeMount(async () => {
  pagination.firstLoading = true;
  await onHandleGetData();
  pagination.firstLoading = false;
});

// 监听评论发送成功
pubsub.on("user:post-comment", onHandlePostComment);

// 路径参数变化
watch(
  () => props.pid,
  async () => {
    pagination.firstLoading = true;
    await onHandleGetData();
    pagination.firstLoading = false;
  }
);

// 卸载组件时卸载对应的频道监听
onBeforeUnmount(() => {
  pubsub.remove("user:post-comment");
});

defineOptions({
  name: "CommentList",
});
</script>

<style scoped lang="scss">
.comment-list {
  color: var(--text-color-1);

  .header {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 20px;
    }
  }

  .list-container {
    padding: 10px 0;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
