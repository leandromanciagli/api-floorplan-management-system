import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DireccionTecnica,
  TipoPersona,
} from '../models';
import {DireccionTecnicaRepository} from '../repositories';

export class DireccionTecnicaTipoPersonaController {
  constructor(
    @repository(DireccionTecnicaRepository)
    public direccionTecnicaRepository: DireccionTecnicaRepository,
  ) { }

  @get('/direccion-tecnicas/{id}/tipo-persona', {
    responses: {
      '200': {
        description: 'TipoPersona belonging to DireccionTecnica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoPersona),
          },
        },
      },
    },
  })
  async getTipoPersona(
    @param.path.string('id') id: typeof DireccionTecnica.prototype.direccionTecnicaId,
  ): Promise<TipoPersona> {
    return this.direccionTecnicaRepository.tipoPersona(id);
  }
}
