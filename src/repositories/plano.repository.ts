import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {Plano, PlanoRelations, Especialidad, Etiqueta} from '../models';
import {EspecialidadRepository} from './especialidad.repository';
import {EtiquetaRepository} from './etiqueta.repository';

export class PlanoRepository extends DefaultCrudRepository<
  Plano,
  typeof Plano.prototype.planoId,
  PlanoRelations
> {

  public readonly especialidad: BelongsToAccessor<Especialidad, typeof Plano.prototype.planoId>;

  public readonly etiquetas: HasManyRepositoryFactory<Etiqueta, typeof Plano.prototype.planoId>;

  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource, @repository.getter('EspecialidadRepository') protected especialidadRepositoryGetter: Getter<EspecialidadRepository>, @repository.getter('EtiquetaRepository') protected etiquetaRepositoryGetter: Getter<EtiquetaRepository>,
  ) {
    super(Plano, dataSource);
    this.etiquetas = this.createHasManyRepositoryFactoryFor('etiquetas', etiquetaRepositoryGetter,);
    this.registerInclusionResolver('etiquetas', this.etiquetas.inclusionResolver);
    this.especialidad = this.createBelongsToAccessorFor('especialidad', especialidadRepositoryGetter,);
    this.registerInclusionResolver('especialidad', this.especialidad.inclusionResolver);
  }
}
