<script lang="ts">
import { h, defineComponent } from "vue";
import { useUserStore } from "@/store";
// 未通过、未审核的照片组件
import Pass from "./components/pass.vue";
import NoPass from "./components/no-pass.vue";
import { AuditStatus } from "@/types/photo";
import type { Photo } from "@/apis/photo/types";

export default defineComponent({
  name: "PhotoItem",
  // props
  props: ["photo"],
  setup(props: { photo: Photo }) {
    // 用户仓库
    const userStore = useUserStore();

    // 映射表
    const table = {
      [AuditStatus.PASS]: () => h(Pass, { photo: props.photo }),
      [AuditStatus.NO_AUDIT]: () => h(NoPass, { photo: props.photo }),
      [AuditStatus.NO_PASS]: () => h(NoPass, { photo: props.photo }),
    };

    // 根据审核状态，渲染不同的组件。
    const render = Reflect.get(table, props.photo.status);

    if (render === undefined) {
      throw new Error("非法的审核状态!!");
    } else if (props.photo.status !== AuditStatus.PASS) {
      // 查看非通过审核的照片时
      if (props.photo.publish_uid !== userStore.userInfo.uid) {
        // 当非作者查看时
        throw new Error(
          "只有作者才能查看的自己非通过的照片! pid:" + props.photo.pid
        );
      }
    }
    return render;
  },
});
</script>
