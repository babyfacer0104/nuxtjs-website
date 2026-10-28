export function useAuth() {
  const user = useState<{ username: string } | null>('auth-user', () => null)
  const loaded = useState('auth-loaded', () => false)

  async function fetchUser() {
    // SSR 时 useRequestFetch 会自动转发浏览器的 cookie
    const res = await useRequestFetch()('/api/auth/me')
    user.value = res.user
    loaded.value = true
  }

  async function login(username: string, password: string) {
    user.value = await $fetch('/api/auth/login', { method: 'POST', body: { username, password } })
    loaded.value = true
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/login')
  }

  return { user, loaded, fetchUser, login, logout }
}
