<template>
  <div class="card-container">
    <div class="title">
      <span>{{ title }}</span>
      <n-tag
        class="pointer"
        size="small"
        :type="isToday ? 'info' : 'warning'"
        @click="handleClick">
        {{ isToday ? $t("today") : $t("week") }}
      </n-tag>
    </div>
    <div class="info">
      <template v-if="loading">
        <div class="loading">
          <n-skeleton class="mt-10" />
          <n-skeleton class="mt-10" />
          <n-skeleton class="mt-10" />
          <n-skeleton
            class="mt-10"
            style="width: 60%" />
        </div>
      </template>
      <template v-else>
        <div class="value mb-10">
          <span class="data">{{ value }}</span>
          <n-icon size="35">
            <slot></slot>
          </n-icon>
        </div>
        <div class="all">
          <span>{{ $t("allD", { title }) }}</span>
          <span class="data">{{ sum }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
// props
const props = defineProps<{
  loading: boolean;
  title: string;
  value: number;
  sum: number;
  isToday: boolean;
}>();
// emits
const emit = defineEmits<{
  "update:isToday": [value: boolean];
}>();

// 点击的回调
const handleClick = () => {
  emit("update:isToday", !props.isToday);
};

defineOptions({
  name: "Card",
});
</script>

<style scoped lang="scss">
.card-container {
  border: var(--border);
  border-radius: 5px;
  .info {
    padding: 0 15px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .loading {
      height: 100%;
    }
    .value {
      display: flex;
      justify-content: space-between;
      .data {
        font-size: 17px;
      }
    }
    .all {
      display: flex;
      justify-content: space-between;
    }
  }
  .title {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: var(--border);
    font-weight: 600;
    padding: 0 10px;
  }
}
</style>
