import { authenticateController } from "@/http/controllers/users/authenticate.controller";
import { profileController } from "@/http/controllers/users/profile.controller";
import { refreshTokenController } from "@/http/controllers/users/refreshToken";
import { registerController } from "@/http/controllers/users/register.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";


export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  app.get("/me",{onRequest: [verifyJWT]}, profileController)
  app.patch('/token/refresh', refreshTokenController)
}