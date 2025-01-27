import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Organizacion} from '../models';
import {OrganizacionRepository} from '../repositories';

export class OrganizacionController {
  constructor(
    @repository(OrganizacionRepository)
    public organizacionRepository: OrganizacionRepository,
  ) { }

  @post('/organizaciones')
  @response(200, {
    description: 'Organizacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Organizacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organizacion, {
            title: 'NewOrganizacion',

          }),
        },
      },
    })
    organizacion: Organizacion,
  ): Promise<Organizacion> {
    return this.organizacionRepository.create(organizacion);
  }

  @get('/organizaciones/count')
  @response(200, {
    description: 'Organizacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Organizacion) where?: Where<Organizacion>,
  ): Promise<Count> {
    return this.organizacionRepository.count(where);
  }

  @get('/organizaciones')
  @response(200, {
    description: 'Array of Organizacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Organizacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Organizacion) filter?: Filter<Organizacion>,
  ): Promise<any[]> {
    const organizaciones = await this.organizacionRepository.find(filter);

    // Contar la cantidad de usuarios para cada organización
    const organizacionesConUsuarios = await Promise.all(
      organizaciones.map(async (organizacion) => {
        const cantidadUsuarios = await this.organizacionRepository.countUsuarios(organizacion.organizacionId);
        return {
          ...organizacion,
          cantidadUsuarios,
        };
      }),
    );

    return organizacionesConUsuarios;
  }

  @patch('/organizaciones')
  @response(200, {
    description: 'Organizacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organizacion, {partial: true}),
        },
      },
    })
    organizacion: Organizacion,
    @param.where(Organizacion) where?: Where<Organizacion>,
  ): Promise<Count> {
    return this.organizacionRepository.updateAll(organizacion, where);
  }

  @get('/organizaciones/{id}')
  @response(200, {
    description: 'Organizacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Organizacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Organizacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Organizacion>
  ): Promise<Organizacion> {
    return this.organizacionRepository.findById(id, filter);
  }

  @patch('/organizaciones/{id}')
  @response(204, {
    description: 'Organizacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Organizacion, {partial: true}),
        },
      },
    })
    organizacion: Organizacion,
  ): Promise<void> {
    await this.organizacionRepository.updateById(id, organizacion);
  }

  @put('/organizaciones/{id}')
  @response(204, {
    description: 'Organizacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() organizacion: Organizacion,
  ): Promise<void> {
    await this.organizacionRepository.replaceById(id, organizacion);
  }

  @del('/organizaciones/{id}')
  @response(204, {
    description: 'Organizacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.organizacionRepository.deleteById(id);
  }
}
