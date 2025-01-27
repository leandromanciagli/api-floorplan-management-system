import {Entity, model, property} from '@loopback/repository';

@model()
export class Rol extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  rolId: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations { }

export type RolWithRelations = Rol & RolRelations;
