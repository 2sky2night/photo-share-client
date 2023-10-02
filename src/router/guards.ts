import { nprogress } from '@/utils'
import type { NavigationHookAfter,NavigationGuard} from 'vue-router'

export const beforeGuards: NavigationGuard = (to, from, next) => {
  nprogress.start()
  next()
}

export const afterGuards: NavigationHookAfter = (to, from) => {
  nprogress.end()
  to.meta?.title?document.title=to.meta.title:document.title='Photo Share'
}