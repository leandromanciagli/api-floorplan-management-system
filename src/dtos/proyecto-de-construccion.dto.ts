export class ProyectoDeConstruccionDTO {
  proyecto: {
    nombre: string,
    nroExpediente: string,
    provincia: string,
    ciudad: string,
    ubicacion: string,
    tipoObra: string,
    destino: string,
    escala: string,
    antecedentes: string,
    referencias: string,
    otrasExigencias: string,
    aprobado: boolean,
  }
  propietario: {
    apellido: string,
    nombres: string,
    dni: string,
    domicilio: string,
    telefono: string,
    email: string,
  }
  direccionTecnica: {
    tipoPersonaId: string,
    razonSocial?: string,
    cuit?: string,
    nombreApellido: string,
    dni: string,
    matricula: string,
    especialidad?: string,
    domicilio: string,
    telefono: string,
    email: string,
  }
  proyectistas: ProyectistaDTO[];
  planos: PlanoDTO[];
}

export class ProyectistaDTO {
  apellido: string;
  nombre: string;
  dni: string;
  matricula: string;
  domicilio: string;
  telefono: string;
}

export class PlanoDTO {
  imagen: string;
  especialidadId: string;
  etiquetas: [];
}
