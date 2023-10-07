<template>
  <div
    class="nav-item p-btn"
    :class="{ active: isActive }"
    @click="onHandleClick">
    <span>{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const props = defineProps<{ path: string; title: string }>();

// 是否高亮
const isActive = computed(() => {
  if (route.path === props.path) {
    return true;
  } else {
    if (route.path.startsWith(props.path) && props.path !== "/") {
      return true;
    }
    return false;
  }
});

// 点击的回调
const onHandleClick = () => {
  router.push(props.path);
};
</script>

<style scoped lang="scss">
.nav-item {
  &.active {
    background-color: var(--primary-color);
    color: #fff;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
