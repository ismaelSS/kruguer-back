import { invalidEquipmentCreationInformation } from "@/errors/invalid-equipment-creation-informations.error"
import { makeEquipmentService } from "@/http/services/factories/make-equipment-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function registerEquipmentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerEquipmentBodySchema = z.object({
    serial: z.string().uuid(),
    ownerId: z.string().uuid(),
    name: z.string()
  })

  const{name, serial, ownerId} = registerEquipmentBodySchema.parse(request.body)


  const equipmentsService = makeEquipmentService()
  try{
    await equipmentsService.register({
      name,
      serial,
      ownerId
    })

    
  }catch(err){
    if(err instanceof invalidEquipmentCreationInformation ){
      return reply.status(400).send({message: err.message})
    }
    throw err
  }
  
  return reply.status(201).send()
  
}