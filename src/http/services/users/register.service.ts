import { UserAlreadyExistsError } from '@/errors/user-already-existes.error'
import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repositories/prisma-user.repository'
import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'

interface iRegisterUser {
  email: string
  password: string
}
export default class RegisterService {

  constructor(private userRepository: UsersRepository) {}

  async create({
    email,
    password,
  }: iRegisterUser) {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await this.userRepository.findByEmail(email)
  
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.userRepository.create({
      email,
      password: password_hash,
    })
  }
  
}
