export class ShoppingListItemAlreadyExistsError extends Error {
  constructor() {
    super('Item already exists in this list.')
  }
}
