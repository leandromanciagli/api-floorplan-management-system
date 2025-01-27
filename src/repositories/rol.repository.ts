import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Rol, RolRelations} from '../models';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.rolId,
  RolRelations
> {
  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource,
  ) {
    super(Rol, dataSource);
  }
}
