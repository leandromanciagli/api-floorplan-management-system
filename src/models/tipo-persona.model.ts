import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoPersona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  tipoPersonaId: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<TipoPersona>) {
    super(data);
  }
}

export interface TipoPersonaRelations {
  // describe navigational properties here
}

export type TipoPersonaWithRelations = TipoPersona & TipoPersonaRelations;
