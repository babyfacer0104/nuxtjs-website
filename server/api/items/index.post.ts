import { randomUUID } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const data = validateItem(await readBody(event))
  const now = new Date().toISOString()
  const item: Item = { id: randomUUID(), ...data, createdAt: now, updatedAt: now }
  const items = await readItems()
  items.push(item)
  await writeItems(items)
  setResponseStatus(event, 201)
  return item
})
