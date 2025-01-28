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
import {DestinoFuncional} from '../models';
import {DestinoFuncionalRepository} from '../repositories';

export class DestinoFuncionalController {
  constructor(
    @repository(DestinoFuncionalRepository)
    public destinoFuncionalRepository: DestinoFuncionalRepository,
  ) { }

  @post('/destinos')
  @response(200, {
    description: 'DestinoFuncional model instance',
    content: {'application/json': {schema: getModelSchemaRef(DestinoFuncional)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DestinoFuncional, {
            title: 'NewDestinoFuncional',
            exclude: ['destinoId'],
          }),
        },
      },
    })
    destinoFuncional: Omit<DestinoFuncional, 'destinoId'>,
  ): Promise<DestinoFuncional> {
    return this.destinoFuncionalRepository.create(destinoFuncional);
  }

  @get('/destinos')
  @response(200, {
    description: 'Array of DestinoFuncional model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DestinoFuncional, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DestinoFuncional) filter?: Filter<DestinoFuncional>,
  ): Promise<DestinoFuncional[]> {
    return this.destinoFuncionalRepository.find(filter);
  }

  @get('/destinos/{id}')
  @response(200, {
    description: 'DestinoFuncional model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DestinoFuncional, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DestinoFuncional, {exclude: 'where'}) filter?: FilterExcludingWhere<DestinoFuncional>
  ): Promise<DestinoFuncional> {
    return this.destinoFuncionalRepository.findById(id, filter);
  }

  @put('/destinos/{id}')
  @response(204, {
    description: 'DestinoFuncional PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() destinoFuncional: DestinoFuncional,
  ): Promise<void> {
    await this.destinoFuncionalRepository.replaceById(id, destinoFuncional);
  }

  @del('/destinos/{id}')
  @response(204, {
    description: 'DestinoFuncional DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.destinoFuncionalRepository.deleteById(id);
  }
}
