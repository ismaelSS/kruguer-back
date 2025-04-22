export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Usuario já cadastrado.')
  }
}