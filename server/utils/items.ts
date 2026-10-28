export interface Item {
  id: string
  name: string
  price: number
  stock: number
  description: string
  createdAt: string
  updatedAt: string
}

const KEY = 'items'

export async function readItems(): Promise<Item[]> {
  return (await useStorage('db').getItem<Item[]>(KEY)) ?? []
}

export async function writeItems(items: Item[]) {
  await useStorage('db').setItem(KEY, items)
}

export function validateItem(body: any): Pick<Item, 'name' | 'price' | 'stock' | 'description'> {
  const name = String(body?.name ?? '').trim()
  const price = Number(body?.price)
  const stock = Number(body?.stock)
  const description = String(body?.description ?? '').trim()

  if (!name) throw createError({ statusCode: 400, message: '名称不能为空' })
  if (!Number.isFinite(price) || price < 0) throw createError({ statusCode: 400, message: '价格必须是非负数字' })
  if (!Number.isInteger(stock) || stock < 0) throw createError({ statusCode: 400, message: '库存必须是非负整数' })

  return { name, price, stock, description }
}
