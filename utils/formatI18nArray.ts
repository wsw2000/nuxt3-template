/**
 * const { tm, rt } = useI18n()
 * formatI18nArray(tm('i18n.key'))
 */
const formatI18nArray = (resource: any): string[] => {
  if (typeof resource === 'string') {
    const prefix = '---\n- '
    if (resource.startsWith(prefix)) return resource.replace(prefix, '').split('\n- ')
    return [resource]
  }
  return resource
}

export default formatI18nArray
