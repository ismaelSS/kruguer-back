import { Prisma, Equipment } from '@prisma/client'

  export type tEquipmentState = "ON" | "OFF" | "FAIL"

export interface iRegisterEquipmentRequest{
  serial: string,
  ownerId: string,
  name: string,
}

export interface iEquipmentResponse {
  name: string
  id:string
  status: tEquipmentState
  changed: Date
  ownerId:string
}

export interface iUpdateByEquipment {
  serial: string
  status:tEquipmentState
}

export interface iUpdateByEquipmentByClientRequest{
  name:string
  id:string
}

export interface EquipmentsRepository {
  register(equipment: iRegisterEquipmentRequest): Promise<Equipment | null>
  findByOwnerId(ownerId: string): Promise<iEquipmentResponse[] | null>
  updateByEquipment(data:iUpdateByEquipment): Promise<void>
  updateByClient(data: iUpdateByEquipmentByClientRequest): Promise<iEquipmentResponse | null>
  findByEquipmentId(id:string): Promise<iEquipmentResponse | null>
  findBySerial(serial:string): Promise<iEquipmentResponse | null>
}
