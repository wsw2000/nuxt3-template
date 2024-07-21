import fs from 'node:fs'
import path from 'node:path'
import svgLoader from 'vite-svg-loader'

function getIcons(dir: string, icons: string[] = []) {
  const _path = path.resolve(__dirname, dir)
  const files = fs.readdirSync(_path)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getIcons(filePath, icons)
    } else if (path.extname(file).toLowerCase() === '.svg') {
      icons.push(filePath)
    }
  })

  return icons.map(icon => path.relative(_path, icon).replace(/\.svg$/, ''))
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      noindex: String(process.env.NOINDEX) === 'true',
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
      link: [{ rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          // tagPosition: 'bodyClose',
          // src: '',
        },
      ],
    },
  },

  features: {
    inlineStyles: false,
  },

  css: ['@unocss/reset/tailwind-compat.css'],

  // routeRules: {
  //   ...(process.env.API_BASE_URL
  //     ? {
  //         '/server/**': {
  //           proxy: process.env.API_BASE_URL.replace(/\/+$/, '') + '/**',
  //         },
  //       }
  //     : {}),
  // },
  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    plugins: [svgLoader()],
    resolve: {
      alias: {
        'ant-design-vue/dist': 'ant-design-vue/dist',
        'ant-design-vue/es': 'ant-design-vue/es',
        'ant-design-vue/lib': 'ant-design-vue/es',
        'ant-design-vue': 'ant-design-vue/es',
      },
    },
  },

  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
  ],

  i18n: {
    vueI18n: './i18n.config.ts',
    compilation: {
      strictMessage: false,
    },
    baseUrl: process.env.WEB_BASE_URL,
    strategy: 'prefix_and_default',
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en',
        file: 'en.json',
        translate: 'English',
      },
      {
        code: 'zh-CN',
        iso: 'zh-CN',
        file: 'zh-CN.json',
        translate: '简体中文',
      },
    ],
  },

  antd: {
    extractStyle: true,
  },

  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700],
    },
  },

  image: {
    domains: ['xx'],
  },

  icon: {
    class: '',
    mode: 'svg',
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons',
      },
    ],
    aliases: getIcons('./assets/icons').reduce(
      (obj, icon) => ({ ...obj, [icon]: `icon:${icon}` }),
      {} as Record<string, string>
    ),
  },

  compatibilityDate: '2024-07-21',
})
