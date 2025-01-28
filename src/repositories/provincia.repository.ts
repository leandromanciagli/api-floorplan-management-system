import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Provincia, ProvinciaRelations} from '../models';

export class ProvinciaRepository extends DefaultCrudRepository<
  Provincia,
  typeof Provincia.prototype.provinciaId,
  ProvinciaRelations
> {
  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource,
  ) {
    super(Provincia, dataSource);
  }
}
