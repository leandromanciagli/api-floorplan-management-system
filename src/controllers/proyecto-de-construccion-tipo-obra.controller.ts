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
  TipoObra,
} from '../models';
import {ProyectoDeConstruccionRepository} from '../repositories';

export class ProyectoDeConstruccionTipoObraController {
  constructor(
    @repository(ProyectoDeConstruccionRepository)
    public proyectoDeConstruccionRepository: ProyectoDeConstruccionRepository,
  ) { }

  @get('/proyecto-de-construccions/{id}/tipo-obra', {
    responses: {
      '200': {
        description: 'TipoObra belonging to ProyectoDeConstruccion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoObra),
          },
        },
      },
    },
  })
  async getTipoObra(
    @param.path.string('id') id: typeof ProyectoDeConstruccion.prototype.proyectoId,
  ): Promise<TipoObra> {
    return this.proyectoDeConstruccionRepository.tipoObra(id);
  }
}
