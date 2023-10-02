import { ref, onBeforeUnmount, computed } from 'vue'
import { pubsub } from "@/utils";

// 监听窗口发生变化时的响应式获取窗口的内部尺寸
export function useMobile() {
  // 视口内部宽度
  const innerWidth = ref(window.innerWidth)
  // 内部高度
  const innerHeight = ref(window.innerHeight)
  // 根据宽度确定是否为小屏幕
  const isMoblie = computed(() => {
    if (innerWidth.value <= 650) {
      return true
    } else {
      return false
    }
  })

  // 视口变化后的回调
  const resizeChange = (_: string, { width, height }: { width: number, height: number }) => {
    innerWidth.value = width
    innerHeight.value = height
  }

  // 开启监听
  pubsub.on('window.resize', resizeChange)

  // 该组件不需要时卸载监听者
  onBeforeUnmount(() => {
    pubsub.removeOn('window.resize', resizeChange)
  })

  return {
    innerHeight,
    innerWidth,
    isMoblie
  }
}