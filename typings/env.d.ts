declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_BASE_URL: string
      WEB_BASE_URL: string
    }
  }
}

export {}
