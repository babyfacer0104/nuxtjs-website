export default defineEventHandler((event) => {
  return { user: getCurrentUser(event) }
})
