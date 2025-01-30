import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {TipoPersona, TipoPersonaRelations} from '../models';

export class TipoPersonaRepository extends DefaultCrudRepository<
  TipoPersona,
  typeof TipoPersona.prototype.tipoPersonaId,
  TipoPersonaRelations
> {
  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource,
  ) {
    super(TipoPersona, dataSource);
  }
}
