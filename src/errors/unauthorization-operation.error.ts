export class UnauthorizationOperationError extends Error{
  constructor(){
    super('Sem permissao para esta operação.')
  }
}