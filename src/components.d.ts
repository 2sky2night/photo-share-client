import ImgLazy from '@/components/img-lazy/index.vue'
import Skeleton from '@/components/skeleton/index.vue'
import TimeFormat from '@/components/time/index.vue'
import CountFormat from '@/components/count/index.vue'
import Empty from '@/components/empty/index.vue'

export { }
declare module 'vue' {
  export interface GlobalComponents {
    ImgLazy: typeof ImgLazy;
    TimeFormat: typeof TimeFormat;
    Skeleton: typeof Skeleton;
    CountFormat: typeof CountFormat;
    Empty: typeof Empty
  }
}