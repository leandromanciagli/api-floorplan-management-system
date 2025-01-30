import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TipoPersona} from '../models';
import {TipoPersonaRepository} from '../repositories';

export class TipoPersonaController {
  constructor(
    @repository(TipoPersonaRepository)
    public tipoPersonaRepository : TipoPersonaRepository,
  ) {}

  @post('/tipos-persona')
  @response(200, {
    description: 'TipoPersona model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoPersona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoPersona, {
            title: 'NewTipoPersona',
            
          }),
        },
      },
    })
    tipoPersona: TipoPersona,
  ): Promise<TipoPersona> {
    return this.tipoPersonaRepository.create(tipoPersona);
  }

  @get('/tipos-persona/count')
  @response(200, {
    description: 'TipoPersona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoPersona) where?: Where<TipoPersona>,
  ): Promise<Count> {
    return this.tipoPersonaRepository.count(where);
  }

  @get('/tipos-persona')
  @response(200, {
    description: 'Array of TipoPersona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoPersona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoPersona) filter?: Filter<TipoPersona>,
  ): Promise<TipoPersona[]> {
    return this.tipoPersonaRepository.find(filter);
  }

  @patch('/tipos-persona')
  @response(200, {
    description: 'TipoPersona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoPersona, {partial: true}),
        },
      },
    })
    tipoPersona: TipoPersona,
    @param.where(TipoPersona) where?: Where<TipoPersona>,
  ): Promise<Count> {
    return this.tipoPersonaRepository.updateAll(tipoPersona, where);
  }

  @get('/tipos-persona/{id}')
  @response(200, {
    description: 'TipoPersona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoPersona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoPersona, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoPersona>
  ): Promise<TipoPersona> {
    return this.tipoPersonaRepository.findById(id, filter);
  }

  @patch('/tipos-persona/{id}')
  @response(204, {
    description: 'TipoPersona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoPersona, {partial: true}),
        },
      },
    })
    tipoPersona: TipoPersona,
  ): Promise<void> {
    await this.tipoPersonaRepository.updateById(id, tipoPersona);
  }

  @put('/tipos-persona/{id}')
  @response(204, {
    description: 'TipoPersona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoPersona: TipoPersona,
  ): Promise<void> {
    await this.tipoPersonaRepository.replaceById(id, tipoPersona);
  }

  @del('/tipos-persona/{id}')
  @response(204, {
    description: 'TipoPersona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoPersonaRepository.deleteById(id);
  }
}
