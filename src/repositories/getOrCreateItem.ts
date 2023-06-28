import { prisma } from '../lib/prisma'

interface Item {
  name: string
  category: string
  userId: string
}

export async function getOrCreateItem({ name, category, userId }: Item) {
  let item = await prisma.item.findFirst({
    where: {
      name: name.toUpperCase(),
      userId,
    },
  })

  if (item && item.category !== category) {
    return await prisma.item.update({
      where: {
        id: item.id,
      },
      data: {
        category,
      },
    })
  }

  if (!item) {
    item = await prisma.item.create({
      data: {
        name: name.toUpperCase(),
        category,
        userId,
      },
    })
  }

  return item
}
