import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {FloorplanDataSource} from '../datasources';
import {ProyectoDeConstruccion, ProyectoDeConstruccionRelations, DestinoFuncional, TipoObra, Provincia, Propietario, Proyectista, DireccionTecnica} from '../models';
import {DestinoFuncionalRepository} from './destino-funcional.repository';
import {TipoObraRepository} from './tipo-obra.repository';
import {ProvinciaRepository} from './provincia.repository';
import {PropietarioRepository} from './propietario.repository';
import {ProyectistaRepository} from './proyectista.repository';
import {DireccionTecnicaRepository} from './direccion-tecnica.repository';

export class ProyectoDeConstruccionRepository extends DefaultCrudRepository<
  ProyectoDeConstruccion,
  typeof ProyectoDeConstruccion.prototype.proyectoId,
  ProyectoDeConstruccionRelations
> {

  public readonly destinoFuncional: BelongsToAccessor<DestinoFuncional, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  public readonly tipoObra: BelongsToAccessor<TipoObra, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  public readonly provincia: BelongsToAccessor<Provincia, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  public readonly proyectistas: HasManyRepositoryFactory<Proyectista, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  public readonly direccionTecnica: BelongsToAccessor<DireccionTecnica, typeof ProyectoDeConstruccion.prototype.proyectoId>;

  constructor(
    @inject('datasources.floorplan') dataSource: FloorplanDataSource, @repository.getter('DestinoFuncionalRepository') protected destinoFuncionalRepositoryGetter: Getter<DestinoFuncionalRepository>, @repository.getter('TipoObraRepository') protected tipoObraRepositoryGetter: Getter<TipoObraRepository>, @repository.getter('ProvinciaRepository') protected provinciaRepositoryGetter: Getter<ProvinciaRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('ProyectistaRepository') protected proyectistaRepositoryGetter: Getter<ProyectistaRepository>, @repository.getter('DireccionTecnicaRepository') protected direccionTecnicaRepositoryGetter: Getter<DireccionTecnicaRepository>,
  ) {
    super(ProyectoDeConstruccion, dataSource);
    this.direccionTecnica = this.createBelongsToAccessorFor('direccionTecnica', direccionTecnicaRepositoryGetter,);
    this.registerInclusionResolver('direccionTecnica', this.direccionTecnica.inclusionResolver);
    this.proyectistas = this.createHasManyRepositoryFactoryFor('proyectistas', proyectistaRepositoryGetter,);
    this.registerInclusionResolver('proyectistas', this.proyectistas.inclusionResolver);
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
