import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Especialidad, EspecialidadRelations} from '../models';

export class EspecialidadRepository extends DefaultCrudRepository<
  Especialidad,
  typeof Especialidad.prototype.especialidadId,
  EspecialidadRelations
> {
  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource,
  ) {
    super(Especialidad, dataSource);
  }
}
