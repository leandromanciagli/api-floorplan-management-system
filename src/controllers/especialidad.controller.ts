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
import {Especialidad} from '../models';
import {EspecialidadRepository} from '../repositories';

export class EspecialidadController {
  constructor(
    @repository(EspecialidadRepository)
    public especialidadRepository : EspecialidadRepository,
  ) {}

  @post('/especialidades')
  @response(200, {
    description: 'Especialidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Especialidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Especialidad, {
            title: 'NewEspecialidad',
            exclude: ['especialidadId'],
          }),
        },
      },
    })
    especialidad: Omit<Especialidad, 'especialidadId'>,
  ): Promise<Especialidad> {
    return this.especialidadRepository.create(especialidad);
  }

  @get('/especialidades/count')
  @response(200, {
    description: 'Especialidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Especialidad) where?: Where<Especialidad>,
  ): Promise<Count> {
    return this.especialidadRepository.count(where);
  }

  @get('/especialidades')
  @response(200, {
    description: 'Array of Especialidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Especialidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Especialidad) filter?: Filter<Especialidad>,
  ): Promise<Especialidad[]> {
    return this.especialidadRepository.find(filter);
  }

  @patch('/especialidades')
  @response(200, {
    description: 'Especialidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Especialidad, {partial: true}),
        },
      },
    })
    especialidad: Especialidad,
    @param.where(Especialidad) where?: Where<Especialidad>,
  ): Promise<Count> {
    return this.especialidadRepository.updateAll(especialidad, where);
  }

  @get('/especialidades/{id}')
  @response(200, {
    description: 'Especialidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Especialidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Especialidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Especialidad>
  ): Promise<Especialidad> {
    return this.especialidadRepository.findById(id, filter);
  }

  @patch('/especialidades/{id}')
  @response(204, {
    description: 'Especialidad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Especialidad, {partial: true}),
        },
      },
    })
    especialidad: Especialidad,
  ): Promise<void> {
    await this.especialidadRepository.updateById(id, especialidad);
  }

  @put('/especialidades/{id}')
  @response(204, {
    description: 'Especialidad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() especialidad: Especialidad,
  ): Promise<void> {
    await this.especialidadRepository.replaceById(id, especialidad);
  }

  @del('/especialidades/{id}')
  @response(204, {
    description: 'Especialidad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.especialidadRepository.deleteById(id);
  }
}
