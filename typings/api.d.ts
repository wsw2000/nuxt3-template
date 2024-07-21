type TRes<T = any> = {
  code: number
  msg: string
  data: T
}

interface TPaging<T> {
  total: number
  list: T[]
  updated_at: string
}

namespace API {
  interface Tets {
    id: number
    name: string
    sign: string
    symbol: string
  }
}
