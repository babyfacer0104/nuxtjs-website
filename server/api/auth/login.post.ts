export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)
  if (username !== DEMO_USER.username || password !== DEMO_USER.password) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }
  setAuthCookie(event, createToken(username, useRuntimeConfig(event).authSecret))
  return { username }
})
