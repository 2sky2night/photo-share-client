<template>
  <n-modal style="width: 80%;max-width: 500px;" :show="modelValue" @update:show="onHandleShow">
    <n-card :title="$t('language')" closable @close="onHandleClose" :bordered="false" size="huge" role="dialog"
      aria-modal="true">
      <template #default>
        <n-select v-model:value="currentValue" :options="languageList" />
      </template>
      <template #footer>
        <div class="actions">
          <n-button @click="onHandleClose">{{ $t('cancel') }}</n-button>
          <n-button class="ml-10" type="primary" @click="onHandleConfirm">{{ $t('confirm') }}</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { useConfigStore } from '@/store';
import { LOCALE_VALUE } from '@/config/i18n'

// props
defineProps<{ modelValue: boolean }>()
// emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// 设置仓库
const configStore = useConfigStore()
// 当前选择的语言
const currentValue = ref(configStore.locale)
// 语言选择列表
const languageList = [
  {
    label: '简体中文',
    value: LOCALE_VALUE.ZH
  },
  {
    label: 'English',
    value: LOCALE_VALUE.EN
  }
]

// 模态框更新的回调
const onHandleShow = (flag: boolean) => {
  emit('update:modelValue', flag)
}

// 关闭的回调
const onHandleClose = () => {
  emit('update:modelValue', false)
}

// 确认的回调
const onHandleConfirm = () => {
  configStore.toggleLocale(currentValue.value)
  onHandleClose()
}

defineOptions({
  name: 'LanguageModal'
})
</script>

<style scoped lang='scss'>
.actions{
  display: flex;
  justify-content: end;
}
</style>