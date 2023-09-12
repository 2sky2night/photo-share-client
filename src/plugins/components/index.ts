import components from "@/components";
import type { Plugin } from "vue";

type Component = keyof (typeof components)

export default {
  install(app) {
    Reflect.ownKeys(components).forEach(key => {
      const componentName = key as Component
      app.component(componentName, components[componentName])
    })
  },
} as Plugin