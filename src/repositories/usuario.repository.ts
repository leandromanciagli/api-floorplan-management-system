import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Rol} from '../models';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.usuarioId,
  UsuarioRelations
> {

  public readonly rol: BelongsToAccessor<Rol, typeof Usuario.prototype.usuarioId>;

  constructor(@inject('datasources.floorplan') dataSource: FloorplanDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,) {
    super(Usuario, dataSource);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
  }
}
