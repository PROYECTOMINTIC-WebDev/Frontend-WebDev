import { gql } from '@apollo/client';

const EDITAR_AVANCE = gql `
mutation ActualizarAvance($id: ID!, $fecha: Date!, $descripcion: String!, $proyecto: String!, $creadoPor: String!) {
    actualizarAvance(_id: $id, fecha: $fecha, descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
      _id
      fecha
      descripcion
         creadoPor {
     _id
   }
    }
  }
`

const CREAR_AVANCE = gql `
mutation CrearAvance($fecha: Date!, $descripcion: String!, $proyecto: String!, $creadoPor: String!) {
    crearAvance(fecha: $fecha, descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
      _id
     fecha
     descripcion 
     
    }
  }
`;
export { EDITAR_AVANCE, CREAR_AVANCE };