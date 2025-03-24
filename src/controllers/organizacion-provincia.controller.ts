import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Organizacion,
  Provincia,
} from '../models';
import {OrganizacionRepository} from '../repositories';

export class OrganizacionProvinciaController {
  constructor(
    @repository(OrganizacionRepository)
    public organizacionRepository: OrganizacionRepository,
  ) { }

  @get('/organizacions/{id}/provincia', {
    responses: {
      '200': {
        description: 'Provincia belonging to Organizacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Provincia),
          },
        },
      },
    },
  })
  async getProvincia(
    @param.path.string('id') id: typeof Organizacion.prototype.organizacionId,
  ): Promise<Provincia> {
    return this.organizacionRepository.provincia(id);
  }
}
