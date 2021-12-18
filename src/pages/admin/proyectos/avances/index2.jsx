import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom';
import { AVANCES } from '../../../../graphql/avances/queries';
import PrivateComponent from '../../../../components/PrivateComponent';


const IndexAvances2 = () => {
  
  const { data, error, loading} = useQuery(AVANCES);

  useEffect(() => {
      console.log("data servidor", data)
  }, [data]);

  if (loading) return <div>Cargando...</div>; 
  return (
      <div className='my-4 mx-6 flex flex-col'>
          <h1 className='text-2x1 font-bold text-gray-900'>Datos Avances:</h1> 
          
            <div className='my-2 self-end'>
              <button className='bg-indigo-500 text-gray-50 p-1 rounded-lg shadow-lg hover:bg-indigo-400'>
                <Link to="/admin/avances/crear">Crear Avance</Link>
                </button>
            </div>
          
          <table className='tabla'>
              <thead>
                  <tr>
                  <th>id</th>   
                  <th>Fecha</th>
                  <th>Descripcion</th>
                  <th>observaciones</th>
                  <th>Editar</th>
                  <th>Crear observacion</th>

                  
                  </tr>
              </thead>
              <tbody>
              {data && 
              data.Avances.map((avances) => {
                      return (
                      <tr key={avances._id}>
                          <td>{avances._id}</td>
                          <td>{avances.fecha}</td>
                          <td>{avances.descripcion}</td>
                          <td>{avances.observaciones}</td>
                          <td>
                          <Link to={`/admin/avances/editar/${avances._id}`}>
                            <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                          </Link>
                        </td>

                        <td>
                          <Link to={`/src/pages/avances/observacion/${avances._id}`}>
                            <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                          </Link>
                        </td>

                        <td></td>
                      </tr>
                      );
              })}
                  </tbody>
              </table>
      </div>
          );
};

const Proyectos = ({nombre}) =>{
  return (
  <div className=''> 
 
      <div> {nombre} </div>

  </div>
  )
}

export default IndexAvances2