import type { RouterConfig } from '@nuxt/schema'
import type { NuxtI18nOptions } from '@nuxtjs/i18n'
import { localizeRoutes } from './routing'
import { nuxtI18nOptions } from '#build/i18n.options.mjs'

// https://nuxt.com.cn/docs/guide/going-further/custom-routing
// 在这里通过 localizeRoutes 方法添加 i18n 多语言路由路径
// 但是这样失去了 https://i18n.nuxtjs.org/guide/custom-paths 的方法自定义路径
// 不过现在你可以直接在该文件下实现自定义，可实现正则的方法匹配等 vue-router 常用方法
export default {
  // scrollBehavior(to, from, savedPosition) {
  //   if (to.name === from.name) return false
  //   if (savedPosition) return savedPosition
  //   return { top: 0 }
  // },
  routes: _routes =>
    localizeRoutes(
      [
        {
          name: 'Home',
          path: '/',
          component: () => import('~/pages/home/page.vue').then(r => r.default || r),
        },
        {
          name: 'Page2',
          path: '/page2',
          component: () => import('~/pages/page2/page.vue').then(r => r.default || r),
        },
      ],
      nuxtI18nOptions as NuxtI18nOptions
    ),
} satisfies RouterConfig
