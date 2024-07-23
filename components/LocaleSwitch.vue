<script setup lang="ts">
const open = defineModel<boolean>('open', {
  default: false,
})

const emit = defineEmits<{
  change: [locale: string]
}>()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const currLocale = computed(() =>
  (locales.value as TLocaleObj[]).find(item => item.code === locale.value)
)

const handleSwitch = (locale: string) => {
  emit('change', locale)
  open.value = false
}
</script>

<template>
  <ADropdown v-model:open="open" :trigger="['click']" placement="bottomRight">
    <div class="flex cursor-pointer items-center max-md:w-full max-md:justify-between">
      <div class="flex items-center md:hidden">
        <span class="text-sm/none">{{ $t('header.language') }}</span>
      </div>
      <div class="flex items-center">
        <span class="text-sm/none">{{ currLocale?.translate }}</span>
        <Icon class="ml-1 text-sm/none text-gray-800" name="fold" />
      </div>
    </div>
    <template #overlay>
      <div class="pt-4">
        <AMenu
          class="overlay"
          :selectable="false"
          @click="({ key }) => handleSwitch(key as string)"
        >
          <AMenuItem
            v-for="item in locales as TLocaleObj[]"
            :key="item.code"
            class="!rounded-xl !px-5 !py-2.5"
          >
            <NuxtLink class="text-sm/none" :to="switchLocalePath(item.code)">
              {{ item.translate }}
            </NuxtLink>
          </AMenuItem>
        </AMenu>
      </div>
    </template>
  </ADropdown>
</template>

<style scoped>
.overlay {
  @apply rounded-2xl border-2 border-gray-800;
  @apply p-2.5 bg-background-frame min-w-40;
}
</style>
