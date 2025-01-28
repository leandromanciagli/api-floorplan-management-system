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
import {Provincia} from '../models';
import {ProvinciaRepository} from '../repositories';

export class ProvinciaController {
  constructor(
    @repository(ProvinciaRepository)
    public provinciaRepository: ProvinciaRepository,
  ) { }

  @post('/provincias')
  @response(200, {
    description: 'Provincia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Provincia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Provincia, {
            title: 'NewProvincia',
            exclude: ['provinciaId'],
          }),
        },
      },
    })
    provincia: Omit<Provincia, 'provinciaId'>,
  ): Promise<Provincia> {
    return this.provinciaRepository.create(provincia);
  }

  @get('/provincias')
  @response(200, {
    description: 'Array of Provincia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Provincia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Provincia) filter?: Filter<Provincia>,
  ): Promise<Provincia[]> {
    return this.provinciaRepository.find(filter);
  }

  @get('/provincias/{id}')
  @response(200, {
    description: 'Provincia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Provincia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Provincia, {exclude: 'where'}) filter?: FilterExcludingWhere<Provincia>
  ): Promise<Provincia> {
    return this.provinciaRepository.findById(id, filter);
  }

  @put('/provincias/{id}')
  @response(204, {
    description: 'Provincia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() provincia: Provincia,
  ): Promise<void> {
    await this.provinciaRepository.replaceById(id, provincia);
  }

  @del('/provincias/{id}')
  @response(204, {
    description: 'Provincia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.provinciaRepository.deleteById(id);
  }
}
