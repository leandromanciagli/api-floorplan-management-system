import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Organizacion} from './organizacion.model';
import {Rol} from './rol.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  usuarioId?: string;

  @property({
    type: 'string',
    required: true,
    unique: true,
    index: {
      unique: true
    }
  })
  sub: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreYapellido: string;

  @property({
    type: 'string',
    required: true,
  })
  dni: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
  })
  profilePicture?: string;

  @property({
    type: 'boolean',
  })
  activado: boolean;

  @belongsTo(() => Rol)
  rolId: string;

  @belongsTo(() => Organizacion)
  organizacionId?: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations { }

export type UsuarioWithRelations = Usuario & UsuarioRelations;
