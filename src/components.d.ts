import ImgLazy from '@/components/img-lazy/index.vue'
import Skeleton from '@/components/skeleton/index.vue'
export { }
declare module 'vue' {
  export interface GlobalComponents {
    ImgLazy: typeof ImgLazy;
    Skeleton: typeof Skeleton;
  }
}