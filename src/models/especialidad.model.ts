import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Especialidad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  especialidadId?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Especialidad>) {
    super(data);
  }
}

export interface EspecialidadRelations {
  // describe navigational properties here
}

export type EspecialidadWithRelations = Especialidad & EspecialidadRelations;
