export class ResourceNotFoundError extends Error{
  constructor(){
    super('Usuario não encontrado.')
  }
}