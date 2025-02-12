import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProyectoDeConstruccion,
  DireccionTecnica,
} from '../models';
import {ProyectoDeConstruccionRepository} from '../repositories';

export class ProyectoDeConstruccionDireccionTecnicaController {
  constructor(
    @repository(ProyectoDeConstruccionRepository)
    public proyectoDeConstruccionRepository: ProyectoDeConstruccionRepository,
  ) { }

  @get('/proyecto-de-construccions/{id}/direccion-tecnica', {
    responses: {
      '200': {
        description: 'DireccionTecnica belonging to ProyectoDeConstruccion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DireccionTecnica),
          },
        },
      },
    },
  })
  async getDireccionTecnica(
    @param.path.string('id') id: typeof ProyectoDeConstruccion.prototype.proyectoId,
  ): Promise<DireccionTecnica> {
    return this.proyectoDeConstruccionRepository.direccionTecnica(id);
  }
}
