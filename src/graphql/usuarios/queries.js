import { gql } from '@apollo/client';

//este es el template de grahpql
const GET_USUARIOS = gql `
query Usuario {
  Usuarios {
    _id
    nombre
    apellido
    correo
    identificacion
    estado
    rol
  }
  
}
`
const GET_USUARIO = gql `
query Usuario($_id: String!) {
  Usuario(_id: $_id) {
    _id
    nombre
    apellido
    correo
    identificacion
    estado
    rol
  }
}
`
export { GET_USUARIOS, GET_USUARIO }