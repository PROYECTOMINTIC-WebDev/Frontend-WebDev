import { gql } from '@apollo/client';

const AVANCES = gql`
query Avances {
  Avances {
    _id
    descripcion
    fecha
    observaciones
    proyecto {
      _id
      nombre
    }
  }
}
`

const FILTRAR = gql `
query FiltrarAvance($idProyecto: String!) {
  filtrarAvance(idProyecto: $idProyecto) {
    _id
    fecha
    descripcion
    observaciones

  }
}
`

export {FILTRAR, AVANCES};