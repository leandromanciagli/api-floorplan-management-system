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
  DestinoFuncional,
} from '../models';
import {ProyectoDeConstruccionRepository} from '../repositories';

export class ProyectoDeConstruccionDestinoFuncionalController {
  constructor(
    @repository(ProyectoDeConstruccionRepository)
    public proyectoDeConstruccionRepository: ProyectoDeConstruccionRepository,
  ) { }

  @get('/proyecto-de-construccions/{id}/destino-funcional', {
    responses: {
      '200': {
        description: 'DestinoFuncional belonging to ProyectoDeConstruccion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DestinoFuncional),
          },
        },
      },
    },
  })
  async getDestinoFuncional(
    @param.path.string('id') id: typeof ProyectoDeConstruccion.prototype.proyectoId,
  ): Promise<DestinoFuncional> {
    return this.proyectoDeConstruccionRepository.destinoFuncional(id);
  }
}
