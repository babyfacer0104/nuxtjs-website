export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const item = (await readItems()).find(i => i.id === id)
  if (!item) throw createError({ statusCode: 404, message: '记录不存在' })
  return item
})
