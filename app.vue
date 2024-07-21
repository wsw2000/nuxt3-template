<script setup lang="ts">
const localeHead = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
})
useHead(localeHead)

const runtimeConfig = useRuntimeConfig()
useHead({
  meta: runtimeConfig.public.noindex
    ? [
        {
          name: 'robots',
          content: 'noindex, nofollow',
        },
      ]
    : [],
})
</script>

<template>
  <NuxtLoadingIndicator color="#28cbad" />
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <NuxtLayout>
    <AExtractStyle>
      <NuxtPage />
    </AExtractStyle>
  </NuxtLayout>
</template>

<style>
html {
  @apply text-elementary font-[Poppins] bg-background font-normal;
}

a {
  @apply hover:text-primary;
}

div::-webkit-scrollbar {
  @apply w-[8px] h-[8px];
}

div::-webkit-scrollbar-track {
  @apply bg-transparent;
}

div::-webkit-scrollbar-thumb {
  @apply bg-gray-200 rounded-[2px] cursor-pointer;
}

.modal .ant-modal-content {
  @apply p-7 border border-gray-200 rounded-[1.25rem] w-full;

  .ant-modal-confirm-content {
    @apply w-full;
  }
}
</style>
