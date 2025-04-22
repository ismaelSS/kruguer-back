import { InvalidEquipmentId } from '@/errors/invalid-equipment-id.error'
import { UnauthorizationOperationError } from '@/errors/unauthorization-operation.error'
import { makeEquipmentService } from '@/http/services/factories/make-equipment-service'
import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateEquipmentByClientController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const modifyEquipmentBodySchema = z.object({
    name: z.string(),
  });

  const modifyEquipmentParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { name } = modifyEquipmentBodySchema.parse(request.body);
  const { id } = modifyEquipmentParamsSchema.parse(request.params);
  const user = request.user as User
  try{
    const equipmentsService = makeEquipmentService()

    //@ts-ignore
    const modifiedEquipment = await equipmentsService.updateByEquipmentClientService({name, id}, user.sub)

    return reply.status(200).send(modifiedEquipment)

  }catch(error){
    if(error instanceof InvalidEquipmentId){
      reply.status(404).send({message:error.message})
    }
    if(error instanceof UnauthorizationOperationError){
      reply.status(401).send({message:error.message})
    }
    throw error
  }
}
