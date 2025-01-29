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
  patch,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {ProyectoDeConstruccionDTO} from '../dtos/proyecto-de-construccion.dto';
import {ProyectoDeConstruccion} from '../models';
import {PropietarioRepository, ProyectistaRepository, ProyectoDeConstruccionRepository} from '../repositories';

export class ProyectoDeConstruccionController {
  constructor(
    @repository(ProyectoDeConstruccionRepository)
    public proyectoDeConstruccionRepository: ProyectoDeConstruccionRepository,

    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,

    @repository(ProyectistaRepository)
    public proyectistaRepository: ProyectistaRepository,
  ) { }

  @post('/proyecto')
  @response(200, {
    description: 'ProyectoDeConstruccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProyectoDeConstruccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProyectoDeConstruccionDTO),
        },
      },
    })
    proyectoDeConstruccion: ProyectoDeConstruccionDTO,
  ): Promise<ProyectoDeConstruccion> {
    try {
      // Creo el propietario
      const nuevoPropietario = await this.propietarioRepository.create(proyectoDeConstruccion.propietario);

      // Creo el proyecto de construcción con el propietario
      const nuevoProyectoDeConstruccion = await this.proyectoDeConstruccionRepository.create({
        nombre: proyectoDeConstruccion.proyecto.nombre,
        nroExpediente: proyectoDeConstruccion.proyecto.nroExpediente,
        provinciaId: proyectoDeConstruccion.proyecto.provincia,
        ciudad: proyectoDeConstruccion.proyecto.ciudad,
        ubicacion: proyectoDeConstruccion.proyecto.ubicacion,
        tipoObraId: proyectoDeConstruccion.proyecto.tipoObra,
        destinoFuncionalId: proyectoDeConstruccion.proyecto.destino,
        escala: proyectoDeConstruccion.proyecto.escala,
        antecedentes: proyectoDeConstruccion.proyecto.antecedentes,
        referencias: proyectoDeConstruccion.proyecto.referencias,
        otrasExigencias: proyectoDeConstruccion.proyecto.otrasExigencias,
        aprobado: false,
        propietarioId: nuevoPropietario.propietarioId,
      });

      // Creo los proyectistas asociados al proyecto de construccion
      if (proyectoDeConstruccion.proyectistas && proyectoDeConstruccion.proyectistas.length > 0) {
        await Promise.all(
          proyectoDeConstruccion.proyectistas.map(async (proyectista) => {
            await this.proyectoDeConstruccionRepository.proyectistas(nuevoProyectoDeConstruccion.proyectoId).create(proyectista);
          })
        );
      }

      return nuevoProyectoDeConstruccion;

    } catch (error) {
      return error
    }
  }

  @get('/proyecto')
  @response(200, {
    description: 'Array of ProyectoDeConstruccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProyectoDeConstruccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProyectoDeConstruccion) filter?: Filter<ProyectoDeConstruccion>,
  ): Promise<ProyectoDeConstruccion[]> {
    return this.proyectoDeConstruccionRepository.find({
      ...filter,
      include: [
        {relation: 'provincia'},
        {relation: 'destinoFuncional'},
        {relation: 'tipoObra'},
        {relation: 'propietario'},
        {relation: 'proyectistas'},
      ],
    });
  }

  @get('/proyecto/{id}')
  @response(200, {
    description: 'ProyectoDeConstruccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProyectoDeConstruccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProyectoDeConstruccion, {exclude: 'where'}) filter?: FilterExcludingWhere<ProyectoDeConstruccion>
  ): Promise<ProyectoDeConstruccion> {
    return this.proyectoDeConstruccionRepository.findById(id, filter);
  }

  @patch('/proyecto/{id}')
  @response(204, {
    description: 'ProyectoDeConstruccion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProyectoDeConstruccion, {partial: true}),
        },
      },
    })
    proyectoDeConstruccion: ProyectoDeConstruccion,
  ): Promise<void> {
    await this.proyectoDeConstruccionRepository.updateById(id, proyectoDeConstruccion);
  }

  @del('/proyecto/{id}')
  @response(204, {
    description: 'ProyectoDeConstruccion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proyectoDeConstruccionRepository.deleteById(id);
  }
}
