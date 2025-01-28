import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Rol} from '../models';
import {RolRepository} from '../repositories';

export class RolController {
  constructor(
    @repository(RolRepository)
    public rolRepository: RolRepository,
  ) { }

  @post('/roles')
  @response(200, {
    description: 'Rol model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rol)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRol',

          }),
        },
      },
    })
    rol: Rol,
  ): Promise<Rol> {
    return this.rolRepository.create(rol);
  }

  @get('/roles')
  @response(200, {
    description: 'Array of Rol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rol, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rol) filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.rolRepository.find(filter);
  }

  @get('/roles/{id}')
  @response(200, {
    description: 'Rol model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rol, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Rol, {exclude: 'where'}) filter?: FilterExcludingWhere<Rol>
  ): Promise<Rol> {
    return this.rolRepository.findById(id, filter);
  }

  @put('/roles/{id}')
  @response(204, {
    description: 'Rol PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rol: Rol,
  ): Promise<void> {
    await this.rolRepository.replaceById(id, rol);
  }

  @del('/roles/{id}')
  @response(204, {
    description: 'Rol DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rolRepository.deleteById(id);
  }
}
