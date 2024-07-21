# Nuxt 3 Minimal Starter

## 技术架构

- [Nuxt 3](https://nuxt.com)
- [Vue 3](https://cn.vuejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [tailwindcss](https://tailwindcss.com)
- [Ant Design Vue](https://www.antdv.com)

## 起步

- [Node.js](https://nodejs.org) `>= 18`
- [pnpm](https://pnpm.io/zh/) 包管理
- [pm2](https://pm2.keymetrics.io/docs/usage/application-declaration) 运行部署应用

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev

# 编译部署
pnpm build

# pm2 启动应用 
pm2 start ecosystem.config.cjs

# pm2 重启应用
pm2 restart ecosystem.config.cjs
```

## 页面路由

在 `pages` 目录下创建 vue 文件，然后在 `/app/router.options.ts` 中定义路由即可。就跟传统的 `vue-router` 一致，创建好的页面后会自动添加国际化的语言路由前缀。

## 国际化

国际化的模块使用的是 [@nuxtjs/i18n](https://v8.i18n.nuxtjs.org)，它内置了 [vue-i18n](https://vue-i18n.intlify.dev)。
语言包采用 [phrase](https://phrase.com) 管理平台。

项目中管理语言在 `nuxt.config.ts` 文件中 `i18n.locales` 配置。

## 主题配置

使用 [@nuxtjs/color-mode](https://color-mode.nuxtjs.org) 配置深色模式，并通过 tailwindcss 添加 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)。可在 `theme.config.ts` 文件配置主题。

## 代码风格

强烈要求按照 `eslint` 规则书写，保持代码风格一致。并且 git commit 也有要求，要求 `<type>(<scope>): <subject>` 的格式。
