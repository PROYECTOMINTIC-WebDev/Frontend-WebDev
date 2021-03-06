import { gql } from '@apollo/client';

const PROYECTOS = gql `
query Proyectos {
  Proyectos {
    _id
    nombre
    estado
    fase
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
    inscripciones{
      estado
      estudiante{
        _id
      }

    }
  }
}
`

export default PROYECTOS;