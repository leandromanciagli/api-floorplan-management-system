import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Proyectista, ProyectistaRelations} from '../models';

export class ProyectistaRepository extends DefaultCrudRepository<
  Proyectista,
  typeof Proyectista.prototype.proyectistaId,
  ProyectistaRelations
> {
  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource,
  ) {
    super(Proyectista, dataSource);
  }
}
