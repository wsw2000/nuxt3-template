<template>
  <ABackTop class="btn">
    <template #icon>
      <Icon class="rotate-180 text-white" name="dropdown" />
    </template>
  </ABackTop>
</template>

<style scoped>
.btn {
  @apply shadow-none;

  :deep(.ant-float-btn-body) {
    @apply bg-gray-800;
  }

  :deep(.ant-float-btn-icon) {
    @apply !text-2xl/none !w-6;
  }
}
</style>
