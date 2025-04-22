import { PrismaUserRepository } from "@/repositories/prisma-user.repository";
import { GetUserProfileUseCase } from "../users/getUserProfile.service";

export function makeGetUserProfileService() {
  const userRepository = new PrismaUserRepository()
  const controller = new GetUserProfileUseCase(userRepository)

  return controller
}