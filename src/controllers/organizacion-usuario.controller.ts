import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Organizacion,
  Usuario,
} from '../models';
import {OrganizacionRepository} from '../repositories';

export class OrganizacionUsuarioController {
  constructor(
    @repository(OrganizacionRepository) protected organizacionRepository: OrganizacionRepository,
  ) { }

  @get('/organizaciones/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Organizacion has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.organizacionRepository.usuarios(id).find(filter);
  }

  @post('/organizaciones/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Organizacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Organizacion.prototype.organizacionId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInOrganizacion',
            exclude: ['usuarioId'],
            optional: ['organizacionId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'usuarioId'>,
  ): Promise<Usuario> {
    return this.organizacionRepository.usuarios(id).create(usuario);
  }

  @patch('/organizaciones/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Organizacion.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.organizacionRepository.usuarios(id).patch(usuario, where);
  }

  @del('/organizaciones/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Organizacion.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.organizacionRepository.usuarios(id).delete(where);
  }
}
