import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoPersona} from './tipo-persona.model';

@model()
export class DireccionTecnica extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  direccionTecnicaId?: string;

  @property({
    type: 'string',
  })
  razonSocial?: string;

  @property({
    type: 'string',
  })
  cuit?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  dni: string;

  @property({
    type: 'string',
    required: true,
  })
  matricula: string;

  @property({
    type: 'string',
  })
  especialidad?: string;

  @property({
    type: 'string',
    required: true,
  })
  domicilio: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @belongsTo(() => TipoPersona)
  tipoPersonaId: string;

  constructor(data?: Partial<DireccionTecnica>) {
    super(data);
  }
}

export interface DireccionTecnicaRelations {
  // describe navigational properties here
}

export type DireccionTecnicaWithRelations = DireccionTecnica & DireccionTecnicaRelations;
