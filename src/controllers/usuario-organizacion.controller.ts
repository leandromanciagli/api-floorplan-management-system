import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Organizacion,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioOrganizacionController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/organizacion', {
    responses: {
      '200': {
        description: 'Organizacion belonging to Usuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Organizacion),
          },
        },
      },
    },
  })
  async getOrganizacion(
    @param.path.string('id') id: typeof Usuario.prototype.usuarioId,
  ): Promise<Organizacion> {
    return this.usuarioRepository.organizacion(id);
  }
}
