import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Provincia} from './provincia.model';
import {Usuario} from './usuario.model';

@model()
export class Organizacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  organizacionId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
  })
  email1?: string;

  @property({
    type: 'string',
  })
  email2?: string;

  @property({
    type: 'string',
  })
  telefono1?: string;

  @property({
    type: 'string',
  })
  telefono2?: string;

  @property({
    type: 'string',
  })
  patronExpediente: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  @belongsTo(() => Provincia)
  provinciaId: string;

  constructor(data?: Partial<Organizacion>) {
    super(data);
  }
}

export interface OrganizacionRelations {
  // describe navigational properties here
}

export type OrganizacionWithRelations = Organizacion & OrganizacionRelations;
