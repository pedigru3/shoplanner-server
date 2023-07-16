export class InvalidValueError extends Error {
  constructor() {
    super('Value must be greater than zero')
  }
}
