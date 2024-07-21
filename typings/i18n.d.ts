import message from '@/locales/develop.json'

declare global {
  type TLocaleObj = {
    code: string
    iso: string
    file: string
    currency: string
    translate: string
  }
}

type Message = typeof message

declare module 'vue-i18n' {
  interface DefineLocaleMessage extends Message {
    // ...
  }
}

export { }
