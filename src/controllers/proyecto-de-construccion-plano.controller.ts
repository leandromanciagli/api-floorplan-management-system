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
  Plano,
} from '../models';
import {ProyectoDeConstruccionRepository} from '../repositories';

export class ProyectoDeConstruccionPlanoController {
  constructor(
    @repository(ProyectoDeConstruccionRepository) protected proyectoDeConstruccionRepository: ProyectoDeConstruccionRepository,
  ) { }

  @get('/proyecto-de-construccions/{id}/planos', {
    responses: {
      '200': {
        description: 'Array of ProyectoDeConstruccion has many Plano',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plano)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Plano>,
  ): Promise<Plano[]> {
    return this.proyectoDeConstruccionRepository.planos(id).find(filter);
  }

  @post('/proyecto-de-construccions/{id}/planos', {
    responses: {
      '200': {
        description: 'ProyectoDeConstruccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plano)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProyectoDeConstruccion.prototype.proyectoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plano, {
            title: 'NewPlanoInProyectoDeConstruccion',
            exclude: ['planoId'],
            optional: ['proyectoDeConstruccionId']
          }),
        },
      },
    }) plano: Omit<Plano, 'planoId'>,
  ): Promise<Plano> {
    return this.proyectoDeConstruccionRepository.planos(id).create(plano);
  }

  @patch('/proyecto-de-construccions/{id}/planos', {
    responses: {
      '200': {
        description: 'ProyectoDeConstruccion.Plano PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plano, {partial: true}),
        },
      },
    })
    plano: Partial<Plano>,
    @param.query.object('where', getWhereSchemaFor(Plano)) where?: Where<Plano>,
  ): Promise<Count> {
    return this.proyectoDeConstruccionRepository.planos(id).patch(plano, where);
  }

  @del('/proyecto-de-construccions/{id}/planos', {
    responses: {
      '200': {
        description: 'ProyectoDeConstruccion.Plano DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plano)) where?: Where<Plano>,
  ): Promise<Count> {
    return this.proyectoDeConstruccionRepository.planos(id).delete(where);
  }
}
