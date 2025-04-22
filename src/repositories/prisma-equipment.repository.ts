import { Equipment, Prisma } from '@prisma/client'
import {
  EquipmentsRepository,
  iEquipmentResponse,
  iRegisterEquipmentRequest,
  iUpdateByEquipment,
  iUpdateByEquipmentByClientRequest,
} from './equipments.repository'
import { prisma } from '@/lib/prisma'

export class PrismaEquipmentRepository implements EquipmentsRepository {
  async register(data: iRegisterEquipmentRequest): Promise<Equipment | null> {

    console.log(data);
    
    const equipment = await prisma.equipment.create({
      data: {
        serial: data.serial,
        name: data.name,
        User: {
          connect: { id: data.ownerId },
        },
      },
    })

    return equipment
  }

  async findByEquipmentId(id: string): Promise<iEquipmentResponse | null> {
    const equipment = await prisma.equipment.findUnique({
      where: {
        id,
      },
    })

    const response = equipment
      ? {
          id: equipment.id,
          name: equipment.name,
          status: equipment.status,
          changed: equipment.changed,
          ownerId: equipment.user_id
        }
      : null

    return response
  }

  async findBySerial(serial: string): Promise<iEquipmentResponse | null> {
    const equipment = await prisma.equipment.findUnique({where: { serial }})

    const response = equipment
      ? {
          id: equipment.id,
          name: equipment.name,
          status: equipment.status,
          changed: equipment.changed,
          ownerId: equipment.user_id
        }
      : null

    return response
  }

  async findByOwnerId(ownerId: string): Promise<iEquipmentResponse[] | null> {
    const equipments = await prisma.equipment.findMany({
      where: {
        user_id: ownerId,
      },
    })

    return equipments.map((equipment) => ({
      name: equipment.name,
      id: equipment.id,
      status: equipment.status,
      changed: equipment.changed,
      ownerId:equipment.user_id
    }))
  }

  async updateByEquipment(data: iUpdateByEquipment): Promise<void> {
    await prisma.equipment.update({
      where: { serial: data.serial },
      data: {
        status: data.status,
        changed: new Date(),
      },
    })
  }

  async updateByClient(
    data: iUpdateByEquipmentByClientRequest
  ): Promise<iEquipmentResponse | null> {
    const equipment = await prisma.equipment.update({
      where: { id: data.id },
      data: {
        name: data.name,
      },
    })

    return {
      id: equipment.id,
      name: equipment.name,
      status: equipment.status,
      changed: equipment.changed,
      ownerId: equipment.user_id
    }
  }
}
