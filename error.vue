<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })

useSeoMeta({
  title: props.error.message || props.error.statusCode?.toString(),
})
</script>

<template>
  <NuxtLayout>
    <div class="my-40 flex flex-col items-center">
      <h2 class="text-[5rem]/none font-bold">{{ props.error.statusCode }}</h2>
      <p v-if="props.error.message" class="mt-2 max-w-80 text-xs/normal text-tertiary">
        {{ props.error.message }}
      </p>
      <button class="button-default mt-8 h-11 px-5 text-sm" @click="handleError">
        Back To HomePage
      </button>
    </div>
  </NuxtLayout>
</template>
