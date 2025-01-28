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
import {TipoObra} from '../models';
import {TipoObraRepository} from '../repositories';

export class TipoObraController {
  constructor(
    @repository(TipoObraRepository)
    public tipoObraRepository: TipoObraRepository,
  ) { }

  @post('/tipos-obra')
  @response(200, {
    description: 'TipoObra model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoObra)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoObra, {
            title: 'NewTipoObra',
            exclude: ['tipoObraId'],
          }),
        },
      },
    })
    tipoObra: Omit<TipoObra, 'tipoObraId'>,
  ): Promise<TipoObra> {
    return this.tipoObraRepository.create(tipoObra);
  }

  @get('/tipos-obra')
  @response(200, {
    description: 'Array of TipoObra model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoObra, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoObra) filter?: Filter<TipoObra>,
  ): Promise<TipoObra[]> {
    return this.tipoObraRepository.find(filter);
  }

  @get('/tipos-obra/{id}')
  @response(200, {
    description: 'TipoObra model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoObra, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoObra, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoObra>
  ): Promise<TipoObra> {
    return this.tipoObraRepository.findById(id, filter);
  }

  @put('/tipos-obra/{id}')
  @response(204, {
    description: 'TipoObra PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoObra: TipoObra,
  ): Promise<void> {
    await this.tipoObraRepository.replaceById(id, tipoObra);
  }

  @del('/tipos-obra/{id}')
  @response(204, {
    description: 'TipoObra DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoObraRepository.deleteById(id);
  }
}
