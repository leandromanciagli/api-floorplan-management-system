import {belongsTo, Entity, model, property} from '@loopback/repository';
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
    unique: true,
    index: {
      unique: true
    }
  })
  dni: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  organizacionId?: string;

  @belongsTo(() => Rol)
  rolId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations { }

export type UsuarioWithRelations = Usuario & UsuarioRelations;
