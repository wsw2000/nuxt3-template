<script setup lang="ts">
const currencySwitchOpen = ref(false)
const localeSwitchOpen = ref(false)
const drawerOpen = ref(false)

const closeDrawer = () => {
  currencySwitchOpen.value = false
  localeSwitchOpen.value = false
  drawerOpen.value = false
}

const { width } = useWindowSize()
watch(width, _width => {
  if (_width > 992 && drawerOpen.value) {
    closeDrawer()
  }
})

const menus = [
  {
    label: 'navbar.cryptocurrencies',
    to: { name: 'Page2' },
  },
]
</script>

<template>
  <div class="header" :style="{ zIndex: 1010 }">
    <NuxtLinkLocale to="/" aria-label="homepage" @click="closeDrawer">logo</NuxtLinkLocale>

    <div class="ml-7 flex w-0 flex-1 items-center space-x-7 max-[992px]:hidden">
      <NuxtLinkLocale
        v-for="menu in menus"
        :key="menu.label"
        class="text-sm !text-elementary"
        :to="menu.to"
      >
        {{ $t(menu.label) }}
        <sup v-if="menu.sup" class="text-xs text-primary" style="zoom: 0.85">{{ menu.sup }}</sup>
      </NuxtLinkLocale>
    </div>

    <div class="flex items-center space-x-4">
      <HeaderSearch />
      <CurrencySwitch class="max-[992px]:hidden" />
      <LocaleSwitch class="max-[992px]:hidden" />
      <div class="cursor-pointer min-[992px]:hidden" @click="drawerOpen = !drawerOpen">
        <CloseOutlined v-if="drawerOpen" />
        <MenuOutlined v-else />
      </div>
    </div>
  </div>

  <ADrawer
    :open="drawerOpen"
    placement="top"
    :closable="false"
    :body-style="{ padding: 0 }"
    height="auto"
    destroy-on-close
    @close="closeDrawer"
  >
    <div class="p-6 pt-0">
      <div class="mb-6 flex h-16 items-center justify-between">
        <NuxtLinkLocale to="/" @click="closeDrawer">
          <Icon class="logo" name="logo" />
        </NuxtLinkLocale>
        <CloseOutlined @click="drawerOpen = false" />
      </div>
      <div class="flex flex-col items-start space-y-7">
        <NuxtLinkLocale
          v-for="menu in menus"
          :key="menu.label"
          class="text-sm font-medium"
          :to="menu.to"
          @click="closeDrawer"
        >
          {{ $t(menu.label) }}
          <sup v-if="menu.sup" class="text-xs text-primary" style="zoom: 0.85">{{ menu.sup }}</sup>
        </NuxtLinkLocale>
      </div>
      <div class="my-7 border-t border-neutral-100" />
      <div class="flex flex-col items-end space-y-5">
        <LocaleSwitch v-model:open="localeSwitchOpen" @change="closeDrawer" />
      </div>
    </div>
  </ADrawer>
</template>

<style scoped>
.header {
  @apply h-16 px-4 min-[992px]:px-10 z-20 flex-shrink-0;
  @apply flex items-center justify-between;
  @apply bg-background-frame;
}

.logo {
  @apply w-[7.125rem] h-8;
}
</style>
