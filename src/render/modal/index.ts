import { h, render, renderSlot, ref, computed } from "vue";
import type { Component } from "vue";
import "./index.css";

/**
 * 渲染模态框
 * @param content 模态框内容组件,该组件可以分发emit('close')来卸载模态框
 * @param props 模态框内容组件的props
 * @param offset 动画开始时模态框的偏移量
 */
export function renderModal(
  content: Component & { emits?: ("close" | string)[] },
  props: Record<any, any>,
  offset?: {
    x: number;
    y: number;
  }
) {
  // 容器
  let mask = document.createElement("div");
  mask.classList.add("modal-mask-container");
  // 模态框的class
  const classList = ref(["modal-container"]);
  const className = computed(() => classList.value.join(" "));
  // 设置动画偏移量
  let ob = new ResizeObserver(([entry]) => {
    if (offset !== undefined) {
      // 若传入了模态框起始偏移量
      mask.style.setProperty("--top", `${offset.y}px`);
      mask.style.setProperty("--left", `${offset.x}px`);
      mask.style.setProperty("--width", `${entry.contentRect.width}px`);
      mask.style.setProperty("--height", `${entry.contentRect.height}px`);
      classList.value.push("modal-enter-offset");
    } else {
      // 无偏移量，居中进场、离场
      classList.value.push("modal-enter");
    }
    // 断开监听
    ob.disconnect();
  });
  // 模态框虚拟DOM
  let container = h(
    // 定义组件
    {
      name: "ModalContainer",
      setup(_, context) {
        return () =>
          h(
            "div",
            {
              onClick(e: Event) {
                // 停止事件发生
                e.stopPropagation();
              },
              class: className.value,
            },
            [renderSlot(context.slots, "default")]
          );
      },
    },
    null,
    // 使用组件
    {
      default: () =>
        h(content, {
          ...props,
          // 监听自定义事件，组件触发close事件可以卸载遮罩层
          onClose: handleUnload,
        }),
    }
  );

  // 卸载容器
  const handleUnload = () => {
    offset
      ? classList.value.push("modal-leave-offset")
      : classList.value.push("modal-leave");
    setTimeout(() => {
      // 移除整个模态框
      mask && mask.remove();
      // 释放内存
      // @ts-ignore
      mask = null;
      // @ts-ignore
      container = null;
      // @ts-ignore
      ob = null;
    }, 280);
  };

  // 点击遮罩层关闭容器
  mask.onclick = handleUnload;

  // 渲染
  render(container, mask);
  // 渲染后才能监听
  ob.observe(container.el as HTMLElement);

  // 去除入场动画
  setTimeout(() => {
    if (
      mask &&
      (classList.value.includes("modal-enter") ||
        classList.value.includes("modal-enter-offset"))
    )
      classList.value.pop();
  }, 300);

  // 挂载
  document.body.appendChild(mask);
}
