import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {ProyectoDeConstruccion, ProyectoDeConstruccionRelations, DestinoFuncional, TipoObra, Provincia, Propietario} from '../models';
import {DestinoFuncionalRepository} from './destino-funcional.repository';
import {TipoObraRepository} from './tipo-obra.repository';
import {ProvinciaRepository} from './provincia.repository';
import {PropietarioRepository} from './propietario.repository';

export class ProyectoDeConstruccionRepository extends DefaultCrudRepository<
  ProyectoDeConstruccion,
  typeof ProyectoDeConstruccion.prototype.proyectoId,
  ProyectoDeConstruccionRelations
> {

  public readonly destinoFuncional: BelongsToAccessor<DestinoFuncional, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  public readonly tipoObra: BelongsToAccessor<TipoObra, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  public readonly provincia: BelongsToAccessor<Provincia, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource, @repository.getter('DestinoFuncionalRepository') protected destinoFuncionalRepositoryGetter: Getter<DestinoFuncionalRepository>, @repository.getter('TipoObraRepository') protected tipoObraRepositoryGetter: Getter<TipoObraRepository>, @repository.getter('ProvinciaRepository') protected provinciaRepositoryGetter: Getter<ProvinciaRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(ProyectoDeConstruccion, dataSource);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.provincia = this.createBelongsToAccessorFor('provincia', provinciaRepositoryGetter,);
    this.registerInclusionResolver('provincia', this.provincia.inclusionResolver);
    this.tipoObra = this.createBelongsToAccessorFor('tipoObra', tipoObraRepositoryGetter,);
    this.registerInclusionResolver('tipoObra', this.tipoObra.inclusionResolver);
    this.destinoFuncional = this.createBelongsToAccessorFor('destinoFuncional', destinoFuncionalRepositoryGetter,);
    this.registerInclusionResolver('destinoFuncional', this.destinoFuncional.inclusionResolver);
  }
}
