<script setup lang="ts">
import type { ConfigProviderProps } from 'ant-design-vue'

const themeConfig = Object.freeze<ConfigProviderProps['theme']>({
  token: {
    colorPrimary: '#28cbad',
    borderRadius: 8,
    fontFamily: 'unset',
  },
})
</script>

<template>
  <AConfigProvider :theme="themeConfig">
    <AppHeader />
    <slot />
    <AppFooter />
    <BackTop />
  </AConfigProvider>
</template>
