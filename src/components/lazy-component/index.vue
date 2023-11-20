<script lang="tsx">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  Suspense,
} from "vue";
import Skeleton from "../skeleton/index.vue";

export default defineComponent({
  name: "LazyComponent",
  props: {
    /**
     * 组件需要被suspense包裹，默认不被包裹
     */
    suspense: {
      type: Boolean,
      default: false,
    },
    /**
     * 最小高度
     */
    minHeight: {
      type: String,
      default: "100px",
    },
  },
  setup(props, { slots }) {
    if (slots.default === undefined) {
      // 未传入默认插槽
      console.warn("LazyComponent need a default slot!");
      return () => <div class="lazy-component-container"></div>;
    }

    // 容器
    const containerDOM = ref<HTMLElement | null>(null);
    // 是否显示默认插槽的内容
    const isShow = ref(false);
    // 容器是否进入视图监听
    let ob: null | IntersectionObserver = new IntersectionObserver(
      ([entity]) => {
        if (entity.isIntersecting) {
          // 进入视口了
          // 显示默认插槽的内容
          isShow.value = true;
          // 销毁监听
          distoryOb();
        }
      }
    );
    // 销毁监听
    const distoryOb = () => {
      if (ob) {
        containerDOM.value && ob.unobserve(containerDOM.value);
        ob.disconnect();
        ob = null;
      }
    };
    // 获取容器DOM
    const handleRef = (value: any) => {
      containerDOM.value = value;
    };

    // 渲染函数
    const render = () => {
      return (
        <div
          class="lazy-component-container"
          style={{ minHeight: props.minHeight }}
          ref={handleRef}>
          {isShow.value && slots.default ? (
            props.suspense ? (
              <Suspense>
                {{
                  default: slots.default,
                  fallback: () => (
                    <Skeleton style="width:100%;min-width:20vw;" />
                  ),
                }}
              </Suspense>
            ) : (
              slots.default()
            )
          ) : (
            <Skeleton />
          )}
        </div>
      );
    };

    // 开始监听
    onMounted(() => {
      if (containerDOM.value && ob) {
        ob.observe(containerDOM.value);
      }
    });

    // 卸载监听
    onBeforeUnmount(distoryOb);

    return render;
  },
});
</script>
