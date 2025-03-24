import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';


export class UsuarioController {

  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
          }),
        },
      },
    })
    usuario: Usuario,
  ): Promise<Usuario> {
    try {
      let newUsuario = await this.usuarioRepository.create(usuario);
      return newUsuario;
    } catch (error) {
      throw new HttpErrors.InternalServerError(error);
    }
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    try {
      return this.usuarioRepository.find({
        ...filter,
        include: [
          {relation: 'rol'},
          {relation: 'organizacion'},
        ],
      });
    } catch (error) {
      return error;
    }
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @get('/usuarios/sub/{sub}')
  @response(200, {
    description: 'Usuario model instance found by sub',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findBySub(
    @param.path.string('sub') sub: string
  ): Promise<Usuario | null> {
    try {
      return this.usuarioRepository.findOne({
        where: {sub},
        include: [
          {relation: 'rol'},
          {relation: 'organizacion'},
        ],
      },);
    } catch (error) {
      return error;
    }
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    try {
      await this.usuarioRepository.replaceById(id, usuario);
    } catch (error) {
      throw new HttpErrors.InternalServerError('Error al crear el usuario');
    }
  }

  @patch('/usuarios/{id}')
  @response(200, {
    description: 'Usuario PATCH success',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<Usuario> {
    await this.usuarioRepository.updateById(id, usuario);
    return this.usuarioRepository.findById(id);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
