import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AVANCES, FILTRAR_AVANCES } from '../../../../graphql/avances/queries';
import useFormData from '../../../../hook/useFormData';
import PROYECTOS from '../../../../graphql/proyectos/queries';


const IndexAvances = () => {
    const {_id} =useParams();
    const {data: queryData, loading, error} = useQuery(PROYECTOS, {
        variables:{_id},
    });
    

    useEffect(() => {
        console.log("datos avances", queryData);
    }, [queryData]);

    if(loading) return <div>Cargando...</div>

    if(queryData.Proyectos){
    
        return <div>

            {queryData.Proyectos.map((proyecto)=>{
                return <CardsAvances proyecto={proyecto} />;
                
              
            })}
        </div>
    }
    
    return (
        <div>
            
        </div>
    )
};

const CardsAvances = ({proyecto}) =>{
    return(
        
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <div class="px-6 py-6">
                    <div className='my-2 self-end'>
                        <button className='bg-indigo-500 text-gray-50 p-1 rounded-lg shadow-lg hover:bg-indigo-400'>
                            <Link to="/admin/avances/crear">Crear Avance</Link>
                        </button>
                    </div>
                    <div class="text-xl font-bold text-gray-900"> 
                    {proyecto.nombre}
                    </div>

                    <div class="text-2x1 mb-2"> 
                    {proyecto.avances.map(avance=>{
                        return <Avances fecha={avance.fecha}  />;
                    })}
                    </div>
                    <p class="text-gray-700 text-base">
                    <div class="text-2x1 mb-2"> 
                    {proyecto.avances.map(avance=>{
                        return <Avances descripcion={avance.descripcion} />;
                    })}
                    </div>
                    </p>
                    <p class="text-gray-700 text-base">
                    <div class="text-2x1 mb-2"> 
                    {proyecto.avances.map(avance=>{
                        return <Avances observaciones={avance.observaciones} />;
                    })}
                    </div>
                    </p>
                </div>
                <div class="px-6 pt-3 pb-2">
                    <button class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Actualizar Avance
                    </button>

                    <button class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Agregar Observaciones
                    </button>          
                </div>
            </div>
        
    )
}
const Avances = ({fecha, descripcion, observaciones}) =>{
    return (
    <div className=''> 
   
        <div> {fecha} </div>
        <div> {descripcion} </div>
        <div> {observaciones} </div>
    </div>
    )
}

export default IndexAvances
