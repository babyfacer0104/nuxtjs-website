// 保护除登录接口外的所有 /api 接口
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  if (!path.startsWith('/api/') || path.startsWith('/api/auth/')) return

  const user = getCurrentUser(event)
  if (!user) throw createError({ statusCode: 401, message: '未登录' })
  event.context.user = user
})
