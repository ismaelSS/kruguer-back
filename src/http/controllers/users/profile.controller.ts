import { makeGetUserProfileService } from '@/http/services/factories/makeGetUserProfileService'
import { FastifyReply, FastifyRequest } from 'fastify'

interface User {
  sub: string
}

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfile = makeGetUserProfileService()

  const user = request.user as User

  const { user: userProfile } = await getUserProfile.execute({
    userId: user.sub,
  })

  return reply.status(200).send({
    user:{
      ...userProfile,
      password: undefined
    }
  })
}
