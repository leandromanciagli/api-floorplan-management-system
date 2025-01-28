import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {TipoObra, TipoObraRelations} from '../models';

export class TipoObraRepository extends DefaultCrudRepository<
  TipoObra,
  typeof TipoObra.prototype.tipoObraId,
  TipoObraRelations
> {
  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource,
  ) {
    super(TipoObra, dataSource);
  }
}
