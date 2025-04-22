import { makeEquipmentService } from "@/http/services/factories/make-equipment-service";
import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";


export async function findEquipmentByOwnerIdController(
  request: FastifyRequest,
  reply: FastifyReply
){
  const equipmentsService = makeEquipmentService()

  const user = request.user as User


  //@ts-ignore
  const equipments = await equipmentsService.findByOwnerId(user.sub)
  return equipments
}