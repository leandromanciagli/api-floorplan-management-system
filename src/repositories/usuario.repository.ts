import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Rol, Organizacion} from '../models';
import {RolRepository} from './rol.repository';
import {OrganizacionRepository} from './organizacion.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.usuarioId,
  UsuarioRelations
> {

  public readonly rol: BelongsToAccessor<Rol, typeof Usuario.prototype.usuarioId>;

  public readonly organizacion: BelongsToAccessor<Organizacion, typeof Usuario.prototype.usuarioId>;

  constructor(@inject('datasources.floorplan') dataSource: FloorplanDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('OrganizacionRepository') protected organizacionRepositoryGetter: Getter<OrganizacionRepository>,) {
    super(Usuario, dataSource);
    this.organizacion = this.createBelongsToAccessorFor('organizacion', organizacionRepositoryGetter,);
    this.registerInclusionResolver('organizacion', this.organizacion.inclusionResolver);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
  }
}
