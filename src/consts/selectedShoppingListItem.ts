export const select = {
  userId: true,
  id: true,
  name: true,
  createdAt: true,
  ShoppingListItem: {
    select: {
      createdAt: true,
      id: true,
      currentPrice: {
        select: {
          id: true,
          value: true,
          createdAt: true,
        },
      },
      quantity: true,
      item: {
        select: {
          id: true,
          name: true,
          category: true,
          prices: {
            select: {
              id: true,
              value: true,
              createdAt: true,
            },
          },
          createdAt: true,
        },
      },
    },
  },
}
