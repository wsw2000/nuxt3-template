const formatPercent = (value?: string | number | null, sign = true) => {
  if (isNullable(value)) return '-'
  const num = Number(value)
  if (num > 0) return (sign ? '+' : '') + num.toFixed(2) + '%'
  if (num < 0) return num.toFixed(2) + '%'
  return num.toFixed(2) + '%'
}

formatPercent.abs = (value?: string | number | null) =>
  formatPercent(value).replace(/^(\+|-)(\d+(\.\d*)?)%$/, '$2%')

export default formatPercent
