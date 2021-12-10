import { gql } from '@apollo/client';

const OBTENER_INSCRIPCIONES = gql`
  query Inscripcion {
    Inscripcion {
      _id
      estado
      estudiante {
        _id
        nombre
        apellido
        correo
        identificacion
      }
      proyecto {
        _id
        nombre
        lider {
          _id
        }
      }
    }
  }
`;

export { OBTENER_INSCRIPCIONES };

