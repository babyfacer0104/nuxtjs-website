export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const items = await readItems()
  const next = items.filter(i => i.id !== id)
  if (next.length === items.length) throw createError({ statusCode: 404, message: '记录不存在' })
  await writeItems(next)
  return { ok: true }
})
