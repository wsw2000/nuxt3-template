const upDownColor = (value?: string | number) => {
  if (!value) return ''
  if (
    (typeof value === 'string' && value.startsWith('-')) ||
    (typeof value === 'number' && value < 0)
  ) {
    return '#f28345'
  }
  if (
    (typeof value === 'string' && value.startsWith('+')) ||
    (typeof value === 'number' && value > 0)
  ) {
    return '#28cbad'
  }
}

export default upDownColor
