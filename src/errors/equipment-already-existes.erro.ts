export class EquipmentAlreadyExistes extends Error {
  constructor() {
    super('Equipamento já cadastrado.')
  }
}