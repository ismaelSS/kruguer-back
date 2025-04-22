import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/errors/invalid-credentials.error'
import { makeAuthenticateService } from '@/http/services/factories/make-authenticate'
import { User } from '@prisma/client'

export async function refreshTokenController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify({ onlyCookie: true })

  
  const user = request.user as User
  const {role} = user

  const token = await reply.jwtSign(
    {
      role
    },
    {
      sign: {
        //@ts-ignore
        sub: request.user.sub,
      },
    }
  )
  const refreshToken = await reply.jwtSign(
    {
      role
    },
    {
      sign: {
        //@ts-ignore
        sub: request.user.sub,
        expiresIn: '30d',
      },
    }
  )
  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
