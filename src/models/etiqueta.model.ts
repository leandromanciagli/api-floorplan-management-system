import {Entity, model, property} from '@loopback/repository';

@model()
export class Etiqueta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  etiquetaId?: string;

  @property({
    type: 'string',
    required: true,
  })
  texto: string;

  @property({
    type: 'string',
  })
  planoId?: string;

  constructor(data?: Partial<Etiqueta>) {
    super(data);
  }
}

export interface EtiquetaRelations {
  // describe navigational properties here
}

export type EtiquetaWithRelations = Etiqueta & EtiquetaRelations;
