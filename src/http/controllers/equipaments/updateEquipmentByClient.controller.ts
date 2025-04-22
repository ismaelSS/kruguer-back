import { EquipmentsService } from '@/http/services/equipments/equipament.service'
import { makeEquipmentService } from '@/http/services/factories/make-equipment-service'
import { iUpdateByEquipment } from '@/repositories/equipments.repository';
import { FastifyRequest } from 'fastify'

export async function updateByClientController(request: FastifyRequest) {
  const equipmentsService = makeEquipmentService();
  const data = request.body as iUpdateByEquipment; 

  await equipmentsService.updateByEquipment(data);
}
