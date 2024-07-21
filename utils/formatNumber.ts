import { Decimal } from 'decimal.js'

export type FormatNumberOptions = {
  /**
   * 是否将大数字缩写为 K、M、B 格式
   * 默认 false
   */
  shortBignumber: boolean
  /**
   * 是否将小数字缩写为 0.0(n)xx 格式
   * n 标识有多少个 0，xx 表示 0 后面的数字
   * n 的个数判断：传入数值时由该值决定，传入 true 时由 decimalPart 决定
   * 后面的数字保留传入的 decimalPart 长度
   * 默认 true
   */
  shortDecimal: boolean | number
  /**
   * 保留小数点几位 为 Infinity 是保留小数
   * 默认 2
   */
  decimalPlaces: number
  /**
   * 当解析失败的数值返回
   * 默认 ''
   */
  fallback: string
}

function formatNumber(number: any, options?: Partial<FormatNumberOptions>): string {
  Decimal.set({ toExpNeg: -21 })

  // 检查金额是否为合法数字
  let _number: Decimal
  try {
    _number = new Decimal(number)
  } catch (error) {
    return options?.fallback ?? ''
  }

  // 默认选项
  const defaultOptions: Omit<FormatNumberOptions, 'fallback'> = {
    shortBignumber: false,
    shortDecimal: true,
    decimalPlaces: 2,
  }

  // 合并选项
  const { shortBignumber, shortDecimal, decimalPlaces } = { ...defaultOptions, ...options }

  // 缩写大数字
  if (shortBignumber && _number.abs().greaterThanOrEqualTo(1000)) {
    const units = ['', 'K', 'M', 'B', 'T']

    let unitIndex = 0
    let result = _number
    while (result.abs().greaterThanOrEqualTo(1000) && unitIndex < units.length - 1) {
      result = result.div(1000)
      unitIndex++
    }

    return (
      formatNumber(result, {
        shortBignumber: false,
        shortDecimal: false,
        decimalPlaces,
      }) + units[unitIndex]
    )
  }

  // 将金额拆分为整数部分和小数部分（如果有）
  const parts = _number.toString().split('.')
  const integerPart = parts[0]
  const decimalPart = parts[1] || ''

  // 缩写小数 取绝对值
  if (shortDecimal) {
    const places = shortDecimal === true ? decimalPlaces : shortDecimal
    if (
      new Decimal(1).div(Math.pow(10, places - 1)).greaterThan(_number.abs()) &&
      decimalPart.length > places
    ) {
      let zeroCount = 0
      let significantDigits = ''

      for (let i = 0; i < decimalPart.length; i++) {
        if (decimalPart.charAt(i) === '0') {
          zeroCount++
        } else {
          significantDigits = decimalPart.substring(i, i + decimalPlaces)
          break
        }
      }

      const sign = _number.lessThan(0) ? '-' : ''
      return (
        sign +
        '0.' +
        (zeroCount > 2 ? `0(${zeroCount})` : Array(zeroCount).fill('0').join('')) +
        significantDigits
        // significantDigits.replace(/0+$/, '')
      )
    }
  }

  // 格式化小数部分
  let formattedDecimal = ''
  if (decimalPart.length > 0 && decimalPlaces > 0) {
    formattedDecimal = '.' + decimalPart.substring(0, decimalPlaces)
  }

  return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + formattedDecimal
}

export default formatNumber
