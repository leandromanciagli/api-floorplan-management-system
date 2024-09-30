import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
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
}
