import { User } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyPermissionLevel(
  permissionLevel: 'ADMIN' | 'CLIENT' | 'MASTER'
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const hierarchy = {
      MASTER: 3,
      ADMIN: 2,
      CLIENT: 1,
    }

    const { role } = request.user as User

    if (hierarchy[role] < hierarchy[permissionLevel]) {
      return reply.status(401).send({ message: 'Sem autorização.' })
    }
  }
}
