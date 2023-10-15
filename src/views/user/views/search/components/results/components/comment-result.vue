<template>
  <div class="comment-result-container">
    <template v-if="pagination.isFirstLoading">
      <comment-list-skeleton :length="pageSize" />
    </template>
    <template v-else>
      <template v-if="pagination.isLoading">
        <comment-list-skeleton :length="pageSize" />
        <div class="pagination">
          <n-pagination
            :item-count="pagination.total"
            :page="props.pageNum"
            :page-size="props.pageSize" />
        </div>
      </template>
      <template v-else-if="list.length">
        <div class="list">
          <comment-item
            v-for="item in list"
            :comment="item"
            :key="item.cid"
            v-model:is-liked="item.is_liked"
            v-model:like-count="item.like_count"
            @click="() => goPhotoDetail(item.pid)" />
        </div>
        <div class="pagination">
          <n-pagination
            :item-count="pagination.total"
            @update:page="onHandlePageChange"
            :page="props.pageNum"
            :page-size="props.pageSize" />
        </div>
      </template>
      <template v-else>
        <div class="empty">
          <empty :desc="$t('noData', { title: $t('comment') })"></empty>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch } from "vue";
import { useNavigator } from "@/hooks";
import CommentListSkeleton from "@User/components/skeleton/comment-list.vue";
import CommentItem from "@User/components/item/comment-item/index.vue";
import { searchCommentAPI } from "@/apis/photo";
import type { SearchType } from "../../../types";
import type { Comment } from "@User/apis/photo/types";

// props
const props = defineProps<{
  pageNum: number;
  keywords: string;
  pageSize: number;
}>();
// emit
const emit = defineEmits<{
  "update:searchType": [value: SearchType];
  "update:pageNum": [value: number];
  "update:pageSize": [value: number];
}>();
// 评论列表
const list = ref<Comment[]>([]);
// 分页数据
const pagination = ref({
  isLoading: false,
  isFirstLoading: false,
  total: 0,
});
// 导航
const {
  user: { goPhotoDetail },
} = useNavigator();

// 获取数据
const onHandleGetData = async () => {
  pagination.value.isLoading = true;
  list.value.length = 0;
  const { data } = await searchCommentAPI({ ...props });
  data.list.forEach((comment) => list.value.push(comment));
  pagination.value.total = data.total;
  pagination.value.isLoading = false;
};

// 重置加载
const onHandleReset = async () => {
  pagination.value.isLoading = true;
  onHandleGetData();
  pagination.value.isLoading = false;
};

// 页码更新的回调
const onHandlePageChange = (v: number) => {
  emit("update:pageNum", v);
};

// 加载数据
onBeforeMount(onHandleReset);

// 路由查询参数更新查询加载数据
watch(props, onHandleGetData);
</script>

<style scoped lang="scss">
.comment-result-container {
  .empty {
    padding: 20px 0;
  }
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
  .list {
    min-height: 450px;
    :deep(.comment-item) {
      cursor: pointer;
    }
  }
}
</style>
