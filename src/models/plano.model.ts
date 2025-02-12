import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Especialidad} from './especialidad.model';
import {Etiqueta} from './etiqueta.model';

@model()
export class Plano extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  planoId?: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @belongsTo(() => Especialidad)
  especialidadId: string;

  @hasMany(() => Etiqueta)
  etiquetas: Etiqueta[];

  @property({
    type: 'string',
  })
  proyectoDeConstruccionId?: string;

  constructor(data?: Partial<Plano>) {
    super(data);
  }
}

export interface PlanoRelations {
  // describe navigational properties here
}

export type PlanoWithRelations = Plano & PlanoRelations;
