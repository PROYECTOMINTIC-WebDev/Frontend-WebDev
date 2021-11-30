import React, {useEffect} from 'react'
import { from, useQuery } from '@apollo/client'
import { GET_USUARIOS } from '../../graphql/usuarios/queries'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const UserIndex = () => {
    const {data,error,loading} = useQuery(GET_USUARIOS)

    useEffect(() => {
        console.log("data servidor",data);
    }, [data])

useEffect(() => {
 if (error) {
     toast.error("error consultando los usuarios");
 }
    
}, [error])


    if(loading) return <div  className="bg-green-400" >
        cargando.....
    </div>
    return (
        
            <div className="flex justify-center w-10/12">
      <table className="table">
        <thead>
          <tr>
            <th  className="text-green-400">Id</th>
            <th className="pr-6">nombre </th>
            <th>Apellido</th>
     
            <th>correo</th>
            <th>Identificacion</th>
            <th>rol</th>
          </tr>
        </thead>
        <tbody>
          {data&&
          
          data.Usuario.map((u) => {
            return (
            <tr  className="text-center" key={u._id}>
                
                <td className="text-left">{u._id}</td>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.correo}</td>
                <td>{u.identificacion}</td>
                <td>{u.rol}</td>
                <td>
                        <Link to={`/usuarios/editar/${u._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                      </td>






            </tr>
            );
          })}
        </tbody>
      </table>
<br />
<br />
      <div>
          <h1>esas orejas sss

          </h1>
      </div>
    </div>
  );
 
        };
   

export default UserIndex;
