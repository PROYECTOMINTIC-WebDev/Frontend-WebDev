import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonLoading from '../../../../components/ButtonLoading';
import Dropdown from '../../../../components/Dropdown';
import Input from '../../../../components/Input'
import PROYECTOS from '../../../../graphql/proyectos/queries';
import useFormData from '../../../../hook/useFormData';

const CrearAvance = () => {
    const {form, formData, updateFormData } = useFormData();
    const [listaProyectos, setListaProyectos] = useState();

    const {data, loading, error}= useQuery(PROYECTOS);
    useEffect(() => {
        console.log(data);
        if(data){
            const lp = {};
            data.Proyectos.forEach(elemento=>{
                lp[elemento._id] = elemento.nombre;
            } );
            
            setListaProyectos(lp);
        }
    }, [data]);

    const submitForm = (e) =>{
        e.prevenitDefault();
        console.log(formData);
    }

    if (loading) return <div>...loading</div>

    return (
        <div className='p-10 flex flex-col items-center'>
            <div className='font-bold self-start text-gray-900'>
                <Link to='/admin/avances'>
                    <i className=' fas fa-arrow-left' />
                </Link>
                Avances
            </div>
            
             
             <h1 className='text-2x1 font-bold text-gray-900'>Crear Avance</h1>
             <form ref={form} onChange={updateFormData} onSubmit={submitForm} >
                 <Input name="fecha" label="Fecha de creacion de avance" required={true} type="date" />
                 <Input name="descripcion" label="Descripcion" required={true} type="text" />
                 <Dropdown  options={listaProyectos} name="nombre" required={true}  />
           
                 <ButtonLoading text= "Crear Avance" loading={false} disabled={false} />

             </form>
        </div>
    )
}

export default CrearAvance
