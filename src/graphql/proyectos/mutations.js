import { gql } from '@apollo/client';



const EDITAR_PROYECTOS = gql `
mutation EditarEstadoProyecto($_id: String!, $estado: Enum_EstadoProyecto,
 $fase: Enum_FaseProyecto) {
  editarEstadoProyecto(_id: $_id, estado: $estado, fase: $fase) {
    _id
    nombre
    estado
    fase
  }
},

`

const EDITAR_FASE = gql`
mutation Mutation($_id: String,  $fase: Enum_FaseProyecto) {
  editarFaseProyecto(_id: $_id, fase: $fase) {
    _id
    fase
    
  }
}


`

const CREAR_PROYECTO = gql `
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;
export { EDITAR_PROYECTOS, CREAR_PROYECTO,EDITAR_FASE};