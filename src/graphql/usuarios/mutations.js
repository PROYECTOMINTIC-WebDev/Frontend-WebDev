import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql `
  mutation EditarUsuario(
    $_id: ID!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
    ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const EDITAR_PERFIL = gql`

  mutation EditarPerfil(
    $_id: ID!
    $nombre: String 
    $apellido: String 
    $identificacion: String
    ) {
    editarPerfil(
      _id: $_id, 
      nombre: $nombre, 
      apellido: $apellido, 
      identificacion: $identificacion
    ) {
      _id
      nombre
      apellido
      identificacion
    }
  }


`;

export { EDITAR_USUARIO, EDITAR_PERFIL };