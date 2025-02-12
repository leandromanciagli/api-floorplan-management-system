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
  ProyectoDeConstruccion,
  Proyectista,
} from '../models';
import {ProyectoDeConstruccionRepository} from '../repositories';

export class ProyectoDeConstruccionProyectistaController {
  constructor(
    @repository(ProyectoDeConstruccionRepository) protected proyectoDeConstruccionRepository: ProyectoDeConstruccionRepository,
  ) { }

  @get('/proyecto-de-construccions/{id}/proyectistas', {
    responses: {
      '200': {
        description: 'Array of ProyectoDeConstruccion has many Proyectista',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proyectista)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Proyectista>,
  ): Promise<Proyectista[]> {
    return this.proyectoDeConstruccionRepository.proyectistas(id).find(filter);
  }

  @post('/proyecto-de-construccions/{id}/proyectistas', {
    responses: {
      '200': {
        description: 'ProyectoDeConstruccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proyectista)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProyectoDeConstruccion.prototype.proyectoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectista, {
            title: 'NewProyectistaInProyectoDeConstruccion',
            exclude: ['proyectistaId'],
            optional: ['proyectoDeConstruccionId']
          }),
        },
      },
    }) proyectista: Omit<Proyectista, 'proyectistaId'>,
  ): Promise<Proyectista> {
    return this.proyectoDeConstruccionRepository.proyectistas(id).create(proyectista);
  }

  @patch('/proyecto-de-construccions/{id}/proyectistas', {
    responses: {
      '200': {
        description: 'ProyectoDeConstruccion.Proyectista PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectista, {partial: true}),
        },
      },
    })
    proyectista: Partial<Proyectista>,
    @param.query.object('where', getWhereSchemaFor(Proyectista)) where?: Where<Proyectista>,
  ): Promise<Count> {
    return this.proyectoDeConstruccionRepository.proyectistas(id).patch(proyectista, where);
  }

  @del('/proyecto-de-construccions/{id}/proyectistas', {
    responses: {
      '200': {
        description: 'ProyectoDeConstruccion.Proyectista DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proyectista)) where?: Where<Proyectista>,
  ): Promise<Count> {
    return this.proyectoDeConstruccionRepository.proyectistas(id).delete(where);
  }
}
