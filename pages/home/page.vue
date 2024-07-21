<script setup lang="ts">
import Banner from './components/Banner.vue'

// const { t } = useI18n()

// useSeoMeta({
//   title: t('home.meta_title'),
//   description: t('home.meta_description'),
//   keywords: t('home.meta_keywords'),
// })
</script>

<template>
  <div class="w-full overflow-hidden">
    <div class="px-2 max-lg:px-5">
      <div class="page-frame">
        <Banner />
      </div>
    </div>
  </div>
</template>
