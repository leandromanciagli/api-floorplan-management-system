import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {DireccionTecnica, DireccionTecnicaRelations, TipoPersona} from '../models';
import {TipoPersonaRepository} from './tipo-persona.repository';

export class DireccionTecnicaRepository extends DefaultCrudRepository<
  DireccionTecnica,
  typeof DireccionTecnica.prototype.direccionTecnicaId,
  DireccionTecnicaRelations
> {

  public readonly tipoPersona: BelongsToAccessor<TipoPersona, typeof DireccionTecnica.prototype.direccionTecnicaId>;

  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource, @repository.getter('TipoPersonaRepository') protected tipoPersonaRepositoryGetter: Getter<TipoPersonaRepository>,
  ) {
    super(DireccionTecnica, dataSource);
    this.tipoPersona = this.createBelongsToAccessorFor('tipoPersona', tipoPersonaRepositoryGetter,);
    this.registerInclusionResolver('tipoPersona', this.tipoPersona.inclusionResolver);
  }
}
