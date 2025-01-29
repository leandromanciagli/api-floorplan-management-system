import {Entity, model, property} from '@loopback/repository';

@model()
export class Proyectista extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  proyectistaId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  dni: string;

  @property({
    type: 'string',
  })
  domicilio?: string;

  @property({
    type: 'string',
  })
  matricula?: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'string',
  })
  proyectoDeConstruccionId?: string;

  constructor(data?: Partial<Proyectista>) {
    super(data);
  }
}

export interface ProyectistaRelations {
  // describe navigational properties here
}

export type ProyectistaWithRelations = Proyectista & ProyectistaRelations;
