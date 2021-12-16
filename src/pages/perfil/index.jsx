import React from 'react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import NavBarFull from "../../components/NavbarTodo";
import Input from '../../components/Input';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hook/useFormData';
import { GET_USUARIO } from '../../graphql/usuarios/queries';
import { useUser } from '../../context/userContext';
import { toast } from 'react-toastify';
import { EDITAR_PERFIL } from '../../graphql/usuarios/mutations';




const IndexPerfil = () => {

  const {form, formData, updateFormData} = useFormData();
  const { userData, setUserData } = useUser();

  const [editarPerfil, { data: dataMutation, error: errorMutation, loading: loadingMutation }] =
    useMutation(EDITAR_PERFIL);
  

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_USUARIO, {
    variables: {
      _id: userData._id,
        
    
    },
  });

  useEffect(() => {
    if (dataMutation) {
      setUserData({ ...userData });
      toast.success('Perfil modificado con exito');
      refetch();
    }
  }, [dataMutation]);

  const submitForm = async (e) => {
    e.preventDefault();

    editarPerfil({
      variables: {
  
        _id: userData._id,
        nombre: userData.nombre,
        apellido: userData.apellido,
        identificacion: userData.identificacion,
        ...formData
  
      },
        
       });

  };

  if (queryLoading) return <div>Loading...</div>;

   
    return (
      
      <>

        <NavBarFull subtitulo="Perfil del usuario" />

        <div className='flex items-center justify-center w-full'>

          <form
            onSubmit={submitForm}
            onChange={updateFormData}
            ref={form}
          >
            <Input
              label="Nombre de la persona:"
              type="text"
              name="nombre"
              defaultValue={queryData?.Usuario.nombre}
              required={true}
            />

            <Input
              label="Apellido de la persona:"
              type="text"
              name="apellido"
              defaultValue={queryData?.Usuario.apellido}
              required={true}
            />

                          
            <Input
              label="Identificación de la persona:"
              type="text"
              name="identificacion"
              defaultValue={queryData?.Usuario.identificacion}
              required={true}
            />

            <br></br>
                    
            <ButtonLoading
              class="mr-10"
              disabled={Object.keys(formData).length === 0}
              loading={loadingMutation}
              text="Actualizar"          
            />              
                  
          </form>
        </div>
                
      

      </>
      
  );

};

export default IndexPerfil
