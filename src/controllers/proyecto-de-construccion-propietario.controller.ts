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
  Propietario,
} from '../models';
import {ProyectoDeConstruccionRepository} from '../repositories';

export class ProyectoDeConstruccionPropietarioController {
  constructor(
    @repository(ProyectoDeConstruccionRepository)
    public proyectoDeConstruccionRepository: ProyectoDeConstruccionRepository,
  ) { }

  @get('/proyecto-de-construccions/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to ProyectoDeConstruccion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Propietario),
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof ProyectoDeConstruccion.prototype.proyectoId,
  ): Promise<Propietario> {
    return this.proyectoDeConstruccionRepository.propietario(id);
  }
}
