export default defineEventHandler(async (event) => {
  const keyword = String(getQuery(event).keyword ?? '').trim().toLowerCase()
  const items = await readItems()
  const result = keyword
    ? items.filter(i => i.name.toLowerCase().includes(keyword) || i.description.toLowerCase().includes(keyword))
    : items
  return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
})
