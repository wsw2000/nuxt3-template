<script setup lang="ts">
import type { PaginationProps } from 'ant-design-vue/es/pagination'
import { useRoute } from 'vue-router'
import { NuxtLink } from '#components'

const current = defineModel<number>({
  default: 1,
})

const emit = defineEmits<{
  click: [event: MouseEvent, page: number]
}>()

const props = withDefaults(
  defineProps<{
    total?: number
    pageSize?: number
    currentLength?: number
    totalI18n?: string
  }>(),
  {
    total: 0,
    pageSize: 10,
    currentLength: 0,
    totalI18n: undefined,
  }
)

const route = useRoute()
const localePath = useLocalePath()
const link = (params?: Record<string, any>) => {
  return localePath({
    name: typeof route.name === 'string' ? route.name.split('__').at(0) : '',
    params: { ...route.params, ...params },
  })
}

const itemRender: PaginationProps['itemRender'] = ({ page, type, originalElement }) => {
  if ((type === 'prev' && page === 0) || (type === 'next' && page === current.value)) {
    return originalElement
  }

  if (originalElement?.type === 'a') {
    originalElement.type = 'span'
    originalElement.props = {}
  }

  const to = link({ page: page === 1 ? undefined : page })
  return h(
    NuxtLink,
    {
      to,
      onClick: (e: MouseEvent) => {
        emit('click', e, page)
      },
    },
    () => originalElement
  )
}

const { t } = useI18n()
const paginationText = computed(() => {
  if (typeof props.currentLength === 'number' && props.totalI18n) {
    const prevPageTotal = (current.value - 1) * props.pageSize
    return props.total
      ? t(props.totalI18n, {
          firstIndex: prevPageTotal + 1,
          lastIndex: prevPageTotal + props.currentLength,
          total: props.total,
        })
      : ''
  }
  return ''
})

const config = useRuntimeConfig()
const paginationLink = computed(() => {
  const links: { rel: 'prev' | 'next'; href: string }[] = []
  const baseUrl = config.public.i18n.baseUrl.replace(/\/+$/, '')

  if (current.value > 1) {
    links.push({
      rel: 'prev',
      href: baseUrl + link({ page: current.value - 1 }),
    })
  }

  if (current.value < Math.ceil(props.total / props.pageSize)) {
    links.push({
      rel: 'next',
      href: baseUrl + link({ page: current.value + 1 }),
    })
  }

  return links
})
useHead({ link: paginationLink })
</script>

<template>
  <div class="pagination">
    <div v-if="paginationText" class="text-xs font-medium text-tertiary">{{ paginationText }}</div>
    <APagination
      :current="current"
      :total="props.total"
      :page-size="props.pageSize"
      :show-size-changer="false"
      hide-on-single-page
      :item-render="itemRender"
    />
  </div>
</template>

<style scoped>
.pagination {
  @apply mt-2 flex flex-col items-center space-y-2;
  @apply md:mt-5 md:flex-row md:justify-between md:space-y-0;

  :deep(.ant-pagination) {
    .ant-pagination-item-link {
      @apply rounded-full !bg-gray-100 text-gray-800 text-[10px];
    }

    .ant-pagination-disabled .ant-pagination-item-link {
      @apply text-gray-400;
    }

    .ant-pagination-item {
      @apply rounded-full hover:bg-gray-100;

      a {
        @apply text-secondary;
      }

      &.ant-pagination-item-active {
        @apply bg-gray-800 border-gray-800;

        a {
          @apply text-white;
        }
      }
    }
  }
}
</style>
