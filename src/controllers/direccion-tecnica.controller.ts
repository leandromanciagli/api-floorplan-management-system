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
import {DireccionTecnica} from '../models';
import {DireccionTecnicaRepository} from '../repositories';

export class DireccionTecnicaController {
  constructor(
    @repository(DireccionTecnicaRepository)
    public direccionTecnicaRepository: DireccionTecnicaRepository,
  ) { }

  @post('/direcciones-tecnicas')
  @response(200, {
    description: 'DireccionTecnica model instance',
    content: {'application/json': {schema: getModelSchemaRef(DireccionTecnica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DireccionTecnica, {
            title: 'NewDireccionTecnica',
            exclude: ['direccionTecnicaId'],
          }),
        },
      },
    })
    direccionTecnica: Omit<DireccionTecnica, 'direccionTecnicaId'>,
  ): Promise<DireccionTecnica> {
    return this.direccionTecnicaRepository.create(direccionTecnica);
  }

  @get('/direcciones-tecnicas')
  @response(200, {
    description: 'Array of DireccionTecnica model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DireccionTecnica, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DireccionTecnica) filter?: Filter<DireccionTecnica>,
  ): Promise<DireccionTecnica[]> {
    return this.direccionTecnicaRepository.find({
      ...filter,
      include: [
        {relation: 'tipoPersona'},
      ],
    });
  }

  @get('/direcciones-tecnicas/{id}')
  @response(200, {
    description: 'DireccionTecnica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DireccionTecnica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DireccionTecnica, {exclude: 'where'}) filter?: FilterExcludingWhere<DireccionTecnica>
  ): Promise<DireccionTecnica> {
    return this.direccionTecnicaRepository.findById(id, filter);
  }

  @put('/direcciones-tecnicas/{id}')
  @response(204, {
    description: 'DireccionTecnica PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() direccionTecnica: DireccionTecnica,
  ): Promise<void> {
    await this.direccionTecnicaRepository.replaceById(id, direccionTecnica);
  }

  @del('/direcciones-tecnicas/{id}')
  @response(204, {
    description: 'DireccionTecnica DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.direccionTecnicaRepository.deleteById(id);
  }
}
