import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUserRepository } from '@/repositories/prisma-user.repository'
import { UserAlreadyExistsError } from '@/errors/user-already-existes.error'
import RegisterService from '@/http/services/users/register.service'

export async function registerController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = registerBodySchema.parse(req.body)

  try {
    const prismaUserRepository = new PrismaUserRepository()
    const registerService = new RegisterService(prismaUserRepository)
    
    await registerService.create({ email, password })
  } catch (err) {
    if(err instanceof UserAlreadyExistsError) {
      return res.status(409).send(err.message)
    }else{
      return err
    }
  }

  return res.status(201).send('Cadastro realizado com sucesso.')
}
