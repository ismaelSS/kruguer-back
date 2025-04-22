import { EquipmentAlreadyExistes } from '@/errors/equipment-already-existes.erro'
import { invalidEquipmentCreationInformation } from '@/errors/invalid-equipment-creation-informations.error'
import { InvalidEquipmentId } from '@/errors/invalid-equipment-id.error'
import { UnauthorizationOperationError } from '@/errors/unauthorization-operation.error'
import { EquipmentsRepository, iEquipmentResponse, iUpdateByEquipment, iUpdateByEquipmentByClientRequest } from '@/repositories/equipments.repository'
import { Equipment } from '@prisma/client'

interface iRegisterEquipment {
  serial: string
  name: string
  ownerId: string
}

export class EquipmentsService {
  constructor(private equipmentRepository: EquipmentsRepository) {}

  async register(data: iRegisterEquipment): Promise<Equipment | null> {
    const equipmentAlreadyExists = await this.equipmentRepository.findBySerial(data.serial)
    if (equipmentAlreadyExists) {
      throw new EquipmentAlreadyExistes()
    }

    const equipment = await this.equipmentRepository.register({
      serial: data.serial,
      name: data.name,
      ownerId: data.ownerId,
    })

    if (!equipment) {
      throw new invalidEquipmentCreationInformation()
    }

    return equipment
  }

  async findByOwnerId(ownerId: string): Promise<iEquipmentResponse[] | null> {
    const equipments = await this.equipmentRepository.findByOwnerId(ownerId)

    return equipments
  }
  

  async updateByEquipment(data: iUpdateByEquipment): Promise<void>{
    await this.equipmentRepository.updateByEquipment(data)
  }


  async updateByEquipmentClientService(data:iUpdateByEquipmentByClientRequest, userId:string): Promise<iEquipmentResponse | null>{
    const equipment = await this.equipmentRepository.findByEquipmentId(data.id)
    console.log(equipment);
    
    if(!equipment){
      throw new InvalidEquipmentId()
    }
 
    if(userId !== equipment.ownerId){
      throw new UnauthorizationOperationError()
    }

    const equipmentRenamed = await this.equipmentRepository.updateByClient(data)
    console.log(equipmentRenamed);
    

    return equipmentRenamed
  }
}
