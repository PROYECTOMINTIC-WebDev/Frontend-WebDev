import { gql } from '@apollo/client';

//este es el template de grahpql
const GET_USUARIOS = gql `
query Usuario {
  Usuario {
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
query UnUsuario($idUsuario: String!) {
    UnUsuario(idUsuario: $idUsuario) {
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