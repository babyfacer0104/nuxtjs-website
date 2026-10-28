export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const data = validateItem(await readBody(event))
  const items = await readItems()
  const index = items.findIndex(i => i.id === id)
  if (index === -1) throw createError({ statusCode: 404, message: '记录不存在' })
  items[index] = { ...items[index]!, ...data, updatedAt: new Date().toISOString() }
  await writeItems(items)
  return items[index]
})
