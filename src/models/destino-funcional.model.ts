import {Entity, model, property} from '@loopback/repository';

@model()
export class DestinoFuncional extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  destinoId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<DestinoFuncional>) {
    super(data);
  }
}

export interface DestinoFuncionalRelations {
  // describe navigational properties here
}

export type DestinoFuncionalWithRelations = DestinoFuncional & DestinoFuncionalRelations;
