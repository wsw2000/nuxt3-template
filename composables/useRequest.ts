import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack'
import { defu } from 'defu'

const useFetchOptions = () => {
  const { locale } = useI18n()
  const defaults = computed(() => ({
    headers: {
      locale: locale.value,
    },
  }))
  return defaults
}

export const useRequest = () => {
  const defaults = useFetchOptions()

  const request = <T, R extends NitroFetchRequest = NitroFetchRequest>(
    url: R,
    options?: NitroFetchOptions<R>
  ) =>
    $fetch<T>(url, defu(options, defaults.value)).catch(err => {
      if (import.meta.server) {
        // eslint-disable-next-line no-console
        console.log('>>> Failed to fetch: ', {
          url,
          query: JSON.stringify(options?.query),
          body: JSON.stringify(options?.body),
        })
      }
      return Promise.reject(err)
    })

  return request
}
