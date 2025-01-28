import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {DestinoFuncional, DestinoFuncionalRelations} from '../models';

export class DestinoFuncionalRepository extends DefaultCrudRepository<
  DestinoFuncional,
  typeof DestinoFuncional.prototype.destinoId,
  DestinoFuncionalRelations
> {
  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource,
  ) {
    super(DestinoFuncional, dataSource);
  }
}
