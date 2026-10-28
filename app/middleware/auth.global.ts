export default defineNuxtRouteMiddleware(async (to) => {
  const { user, loaded, fetchUser } = useAuth()
  if (!loaded.value) await fetchUser()

  if (to.path === '/login') {
    if (user.value) return navigateTo('/')
    return
  }
  if (!user.value) return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
})
