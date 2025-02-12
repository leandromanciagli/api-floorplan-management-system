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
  Provincia,
} from '../models';
import {ProyectoDeConstruccionRepository} from '../repositories';

export class ProyectoDeConstruccionProvinciaController {
  constructor(
    @repository(ProyectoDeConstruccionRepository)
    public proyectoDeConstruccionRepository: ProyectoDeConstruccionRepository,
  ) { }

  @get('/proyecto-de-construccions/{id}/provincia', {
    responses: {
      '200': {
        description: 'Provincia belonging to ProyectoDeConstruccion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Provincia),
          },
        },
      },
    },
  })
  async getProvincia(
    @param.path.string('id') id: typeof ProyectoDeConstruccion.prototype.proyectoId,
  ): Promise<Provincia> {
    return this.proyectoDeConstruccionRepository.provincia(id);
  }
}
