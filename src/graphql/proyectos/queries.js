import { gql } from '@apollo/client';

const PROYECTOS = gql `
query Proyectos {
  Proyectos {
    _id
    nombre
    estado
    objetivos {
      descripcion
      tipo
    }lider {
      _id
      nombre
    }
    avances {
      fecha
      descripcion
      observaciones
    }
  }
}
`

export default PROYECTOS;