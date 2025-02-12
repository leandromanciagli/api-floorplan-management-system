import {
  Filter,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {ProyectoDeConstruccionDTO} from '../dtos/proyecto-de-construccion.dto';
import {ProyectoDeConstruccion} from '../models';
import {
  DireccionTecnicaRepository,
  EspecialidadRepository,
  PlanoRepository,
  PropietarioRepository,
  ProyectistaRepository,
  ProyectoDeConstruccionRepository,
} from '../repositories';

export class ProyectoDeConstruccionController {
  constructor(
    @repository(ProyectoDeConstruccionRepository)
    public proyectoDeConstruccionRepository: ProyectoDeConstruccionRepository,

    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,

    @repository(ProyectistaRepository)
    public proyectistaRepository: ProyectistaRepository,

    @repository(DireccionTecnicaRepository)
    public direccionTecnicaRepository: DireccionTecnicaRepository,

    @repository(EspecialidadRepository)
    public especialidadRepository: EspecialidadRepository,

    @repository(PlanoRepository)
    public planoRepository: PlanoRepository,
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

      if (!proyectoDeConstruccion) {
        throw new HttpErrors.BadRequest('El proyecto de construcción es requerido');
      }

      if (!proyectoDeConstruccion.proyecto) {
        throw new HttpErrors.BadRequest('Los datos del proyecto de construcción son requeridos');
      }

      if (!proyectoDeConstruccion.direccionTecnica) {
        throw new HttpErrors.BadRequest('Los datos de la dirección técnica son requeridos');
      }

      if (!proyectoDeConstruccion.proyectistas) {
        throw new HttpErrors.BadRequest('Los datos de el/los proyectistas son requeridos');
      }

      if (!proyectoDeConstruccion.planos) {
        throw new HttpErrors.BadRequest('Los datos de el/los planos son requeridos');
      }

      // Creo el propietario
      const nuevoPropietario = await this.propietarioRepository.create(proyectoDeConstruccion.propietario);

      // Creo la direccion tecnica
      const nuevaDireccionTecnica = await this.direccionTecnicaRepository.create(proyectoDeConstruccion.direccionTecnica);

      // Creo el proyecto de construcción con el propietario y la direccion tecnica
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
        direccionTecnicaId: nuevaDireccionTecnica.direccionTecnicaId,
      });

      // Creo los proyectistas asociados al proyecto de construccion
      if (proyectoDeConstruccion.proyectistas && proyectoDeConstruccion.proyectistas.length > 0) {
        await Promise.all(
          proyectoDeConstruccion.proyectistas.map(async (proyectista) => {
            await this.proyectoDeConstruccionRepository.proyectistas(nuevoProyectoDeConstruccion.proyectoId).create(proyectista);
          })
        );
      }

      // Creo los planos asociados al proyecto de construccion
      if (proyectoDeConstruccion.planos && proyectoDeConstruccion.planos.length > 0) {
        await Promise.all(
          proyectoDeConstruccion.planos.map(async (plano) => {

            // Verifica que se envie la especialidadId
            if (!plano.especialidadId) {
              throw new HttpErrors.BadRequest('El plano debe tener una especialidad.');
            }

            // Verifica que la especialidad sea valida antes de crear el plano
            const especialidadExiste = await this.especialidadRepository.exists(plano.especialidadId);
            if (!especialidadExiste) {
              throw new HttpErrors.BadRequest('La especialidad es inválida.');
            }

            // Crea el plano
            const nuevoPlano = await this.proyectoDeConstruccionRepository.planos(nuevoProyectoDeConstruccion.proyectoId).create({
              imagen: plano.imagen,
              especialidadId: plano.especialidadId,
            });

            // Crea etiquetas para el plano
            if (plano.etiquetas && plano.etiquetas.length > 0) {
              await Promise.all(
                plano.etiquetas.map(async (etiqueta) => {
                  await this.planoRepository.etiquetas(nuevoPlano.planoId).create({
                    texto: etiqueta,
                  });
                })
              );
            }
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
        {
          relation: 'direccionTecnica',
          scope: {
            include: [{relation: 'tipoPersona'}],
          },
        },
        {
          relation: 'planos',
          scope: {
            include: [
              {relation: 'especialidad'},
              {relation: 'etiquetas'}
            ],
          },
        },
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
