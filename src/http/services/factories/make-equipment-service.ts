import { PrismaEquipmentRepository } from "@/repositories/prisma-equipment.repository"
import { EquipmentsService } from "../equipments/equipament.service"

export function makeEquipmentService() {
  const equipmentRepository = new PrismaEquipmentRepository()
  const controller = new  EquipmentsService(equipmentRepository)

  return controller
}