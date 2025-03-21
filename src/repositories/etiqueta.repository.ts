import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Etiqueta, EtiquetaRelations} from '../models';

export class EtiquetaRepository extends DefaultCrudRepository<
  Etiqueta,
  typeof Etiqueta.prototype.etiquetaId,
  EtiquetaRelations
> {
  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource,
  ) {
    super(Etiqueta, dataSource);
  }
}
