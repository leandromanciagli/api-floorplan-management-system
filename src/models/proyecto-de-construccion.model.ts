import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {DestinoFuncional} from './destino-funcional.model';
import {Propietario} from './propietario.model';
import {Provincia} from './provincia.model';
import {TipoObra} from './tipo-obra.model';
import {Proyectista} from './proyectista.model';
import {DireccionTecnica} from './direccion-tecnica.model';

@model()
export class ProyectoDeConstruccion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  proyectoId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  nroExpediente: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  escala: string;

  @property({
    type: 'string',
  })
  antecedentes?: string;

  @property({
    type: 'string',
  })
  referencias?: string;

  @property({
    type: 'string',
  })
  otrasExigencias?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  aprobado: boolean;

  @belongsTo(() => DestinoFuncional)
  destinoFuncionalId: string;

  @belongsTo(() => TipoObra)
  tipoObraId: string;

  @belongsTo(() => Provincia)
  provinciaId: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasMany(() => Proyectista)
  proyectistas: Proyectista[];

  @belongsTo(() => DireccionTecnica)
  direccionTecnicaId: string;

  constructor(data?: Partial<ProyectoDeConstruccion>) {
    super(data);
  }
}

export interface ProyectoDeConstruccionRelations {
  // describe navigational properties here
}

export type ProyectoDeConstruccionWithRelations = ProyectoDeConstruccion & ProyectoDeConstruccionRelations;
