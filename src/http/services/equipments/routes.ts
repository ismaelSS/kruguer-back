import { findEquipmentByOwnerIdController } from "@/http/controllers/equipaments/findByOwnerId.controller";
import { registerEquipmentController } from "@/http/controllers/equipaments/register.controller";
import { updateByEquipmentController } from "@/http/controllers/equipaments/updateByEquipment.controller";
import { updateEquipmentByClientController } from "@/http/controllers/equipaments/updateEquipmentByClient.controlle";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyPermissionLevel } from "@/http/middlewares/verify-permission-level";
import { FastifyInstance } from "fastify";

export async function equipmentsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/equipments',{onRequest: [verifyPermissionLevel('ADMIN')]}, registerEquipmentController )
  app.get('/equipments', findEquipmentByOwnerIdController)
  app.patch('/equipments/selfUpdate', updateByEquipmentController)
  app.patch('/equipments/:id', updateEquipmentByClientController)
}
