import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plano,
  Especialidad,
} from '../models';
import {PlanoRepository} from '../repositories';

export class PlanoEspecialidadController {
  constructor(
    @repository(PlanoRepository)
    public planoRepository: PlanoRepository,
  ) { }

  @get('/planos/{id}/especialidad', {
    responses: {
      '200': {
        description: 'Especialidad belonging to Plano',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Especialidad),
          },
        },
      },
    },
  })
  async getEspecialidad(
    @param.path.string('id') id: typeof Plano.prototype.planoId,
  ): Promise<Especialidad> {
    return this.planoRepository.especialidad(id);
  }
}
