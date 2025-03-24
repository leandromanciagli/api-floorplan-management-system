import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Organizacion, OrganizacionRelations, Usuario, Provincia} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {ProvinciaRepository} from './provincia.repository';

export class OrganizacionRepository extends DefaultCrudRepository<
  Organizacion,
  typeof Organizacion.prototype.organizacionId,
  OrganizacionRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Organizacion.prototype.organizacionId>;

  public readonly provincia: BelongsToAccessor<Provincia, typeof Organizacion.prototype.organizacionId>;

  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ProvinciaRepository') protected provinciaRepositoryGetter: Getter<ProvinciaRepository>,
  ) {
    super(Organizacion, dataSource);
    this.provincia = this.createBelongsToAccessorFor('provincia', provinciaRepositoryGetter,);
    this.registerInclusionResolver('provincia', this.provincia.inclusionResolver);
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
