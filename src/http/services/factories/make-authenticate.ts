
import { PrismaUserRepository } from "@/repositories/prisma-user.repository"
import { AuthenticateService } from "../users/authenticate.service"


export function makeAuthenticateService() {
  const usersRepository = new PrismaUserRepository()
  const authenticateUseCase = new AuthenticateService(usersRepository)

  return authenticateUseCase
}
