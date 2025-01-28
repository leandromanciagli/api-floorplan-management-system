import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoObra extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  tipoObraId?: string;


  constructor(data?: Partial<TipoObra>) {
    super(data);
  }
}

export interface TipoObraRelations {
  // describe navigational properties here
}

export type TipoObraWithRelations = TipoObra & TipoObraRelations;
