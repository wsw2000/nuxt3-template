// https://github.com/nuxt-modules/i18n/blob/main/src/runtime/routing/compatibles/routing.ts
import type { RouteRecordRaw } from 'vue-router'
import type { NuxtI18nOptions } from '@nuxtjs/i18n'
import type { Locale } from 'vue-i18n'
import { isString } from '@intlify/shared'

type MarkOptional<Type, Keys extends keyof Type> = Type extends Type
  ? Omit<Type, Keys> & Partial<Pick<Type, Keys>>
  : never

interface ComputedRouteOptions {
  locales: readonly string[]
  paths: Record<string, string>
}

type RouteOptionsResolver = (
  route: RouteRecordRaw,
  localeCodes: string[]
) => ComputedRouteOptions | undefined

type LocalizeRoutesParams = NuxtI18nOptions & {
  includeUnprefixedFallback?: boolean
  optionsResolver?: RouteOptionsResolver
}

type LocalizedRoute = RouteRecordRaw & { locale: Locale; parent: RouteRecordRaw | undefined }

type LocalizeRouteParams = {
  locales: string[]
  parent?: RouteRecordRaw
  extra?: boolean
}

interface PrefixLocalizedRouteOptions {
  locale: Locale
  defaultLocale?: Locale | undefined
  parent: RouteRecordRaw | undefined
  path: string
}

type Directions = 'ltr' | 'rtl' | 'auto'

type LocaleFile = { path: string; cache?: boolean }

interface LocaleObject extends Record<string, any> {
  code: Locale
  name?: string
  dir?: Directions
  domain?: string
  file?: string | LocaleFile
  files?: string[] | LocaleFile[]
  isCatchallLocale?: boolean
  iso?: string
}

const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('')

function getNormalizedLocales(locales: NuxtI18nOptions['locales']): LocaleObject[] {
  locales = locales || []
  const normalized: LocaleObject[] = []
  for (const locale of locales) {
    if (isString(locale)) {
      normalized.push({ code: locale, iso: locale })
    } else {
      normalized.push(locale)
    }
  }
  return normalized
}

function prefixLocalizedRoute(
  localizeOptions: PrefixLocalizedRouteOptions,
  options: LocalizeRoutesParams,
  extra = false
): boolean {
  const isDefaultLocale = localizeOptions.locale === (options.defaultLocale ?? '')
  const isChildWithRelativePath =
    localizeOptions.parent != null && !localizeOptions.path.startsWith('/')

  return (
    !extra &&
    !options.differentDomains &&
    !isChildWithRelativePath &&
    !(isDefaultLocale && options.strategy === 'prefix_except_default')
  )
}

function adjustRoutePathForTrailingSlash(localized: LocalizedRoute, trailingSlash?: boolean) {
  const isChildWithRelativePath = localized.parent != null && !localized.path.startsWith('/')
  return (
    localized.path.replace(/\/+$/, '') + (trailingSlash ? '/' : '') ||
    (isChildWithRelativePath ? '' : '/')
  )
}

export function localizeRoutes(
  routes: RouteRecordRaw[],
  options: LocalizeRoutesParams
): RouteRecordRaw[] {
  if (options.strategy === 'no_prefix') {
    return routes
  }

  function localizeRoute(
    route: RouteRecordRaw,
    { locales = [], parent, extra = false }: LocalizeRouteParams
  ): RouteRecordRaw[] {
    if (route.redirect && !route.component) {
      return [route]
    }

    const routeOptions = options.optionsResolver?.(route, locales)
    if (options.optionsResolver != null && routeOptions == null) {
      return [route]
    }

    const componentOptions: ComputedRouteOptions = {
      locales: locales.filter(locale => (routeOptions?.locales ?? locales).includes(locale)),
      paths: {},
      ...routeOptions,
    }

    const localizedRoutes: (LocalizedRoute | RouteRecordRaw)[] = []
    for (const locale of componentOptions.locales) {
      const localized: LocalizedRoute = { ...route, locale, parent }
      const isDefaultLocale = locale === options.defaultLocale
      const addDefaultTree =
        isDefaultLocale && options.strategy === 'prefix_and_default' && parent == null && !extra

      if (addDefaultTree && parent == null && !extra) {
        localizedRoutes.push(...localizeRoute(route, { locales: [locale], extra: true }))
      }

      const nameSegments = [localized.name as string, options.routesNameSeparator, locale]
      if (extra) {
        nameSegments.push(options.routesNameSeparator, options.defaultLocaleRouteNameSuffix)
      }

      localized.name &&= join(...nameSegments)

      localized.children &&= localized.children.flatMap(child =>
        localizeRoute(child, { locales: [locale], parent: route, extra })
      )

      localized.path = componentOptions.paths?.[locale] ?? localized.path

      const localePrefixable = prefixLocalizedRoute(localized, options, extra)
      if (localePrefixable) {
        localized.path = join('/', locale, localized.path)

        if (isDefaultLocale && options.strategy === 'prefix' && options.includeUnprefixedFallback) {
          localizedRoutes.push({ ...route, locale, parent })
        }
      }

      localized.path &&= adjustRoutePathForTrailingSlash(localized, options.trailingSlash)
      localizedRoutes.push(localized)
    }

    return localizedRoutes.flatMap((x: MarkOptional<LocalizedRoute, 'parent' | 'locale'>) => {
      delete x.parent
      delete x.locale
      return x
    })
  }

  return routes.flatMap(route =>
    localizeRoute(route, { locales: getNormalizedLocales(options.locales).map(x => x.code) })
  )
}
