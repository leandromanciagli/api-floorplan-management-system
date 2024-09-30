import {Entity, model, property, hasMany} from '@loopback/repository';
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
  provincia: string;

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
    required: true,
  })
  patronExpediente: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  constructor(data?: Partial<Organizacion>) {
    super(data);
  }
}

export interface OrganizacionRelations {
  // describe navigational properties here
}

export type OrganizacionWithRelations = Organizacion & OrganizacionRelations;
