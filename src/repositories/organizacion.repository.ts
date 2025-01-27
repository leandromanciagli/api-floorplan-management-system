import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Organizacion, OrganizacionRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class OrganizacionRepository extends DefaultCrudRepository<
  Organizacion,
  typeof Organizacion.prototype.organizacionId,
  OrganizacionRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Organizacion.prototype.organizacionId>;

  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Organizacion, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }

  // Método para contar los usuarios de una organización
  async countUsuarios(organizacionId: typeof Organizacion.prototype.organizacionId): Promise<number> {
    const usuarioRepository = await this.usuarioRepositoryGetter();
    const result = await usuarioRepository.count({organizacionId});
    return result.count;
  }
}
