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
}
