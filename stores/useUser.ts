export const useUser = defineStore('userInfo', () => {
  const userInfo = reactive({
    id: '',
  })
  return {
    userInfo,
  }
})
