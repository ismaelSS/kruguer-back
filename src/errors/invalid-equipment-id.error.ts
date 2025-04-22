export class InvalidEquipmentId extends Error{
  constructor(){
    super('Equipamento não encontrado.')
  }
}