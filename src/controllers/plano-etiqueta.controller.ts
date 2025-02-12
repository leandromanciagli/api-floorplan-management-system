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
  Plano,
  Etiqueta,
} from '../models';
import {PlanoRepository} from '../repositories';

export class PlanoEtiquetaController {
  constructor(
    @repository(PlanoRepository) protected planoRepository: PlanoRepository,
  ) { }

  @get('/planos/{id}/etiquetas', {
    responses: {
      '200': {
        description: 'Array of Plano has many Etiqueta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Etiqueta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Etiqueta>,
  ): Promise<Etiqueta[]> {
    return this.planoRepository.etiquetas(id).find(filter);
  }

  @post('/planos/{id}/etiquetas', {
    responses: {
      '200': {
        description: 'Plano model instance',
        content: {'application/json': {schema: getModelSchemaRef(Etiqueta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plano.prototype.planoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Etiqueta, {
            title: 'NewEtiquetaInPlano',
            exclude: ['etiquetaId'],
            optional: ['planoId']
          }),
        },
      },
    }) etiqueta: Omit<Etiqueta, 'etiquetaId'>,
  ): Promise<Etiqueta> {
    return this.planoRepository.etiquetas(id).create(etiqueta);
  }

  @patch('/planos/{id}/etiquetas', {
    responses: {
      '200': {
        description: 'Plano.Etiqueta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Etiqueta, {partial: true}),
        },
      },
    })
    etiqueta: Partial<Etiqueta>,
    @param.query.object('where', getWhereSchemaFor(Etiqueta)) where?: Where<Etiqueta>,
  ): Promise<Count> {
    return this.planoRepository.etiquetas(id).patch(etiqueta, where);
  }

  @del('/planos/{id}/etiquetas', {
    responses: {
      '200': {
        description: 'Plano.Etiqueta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Etiqueta)) where?: Where<Etiqueta>,
  ): Promise<Count> {
    return this.planoRepository.etiquetas(id).delete(where);
  }
}
