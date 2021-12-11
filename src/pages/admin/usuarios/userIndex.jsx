import React, { useEffect, useState } from "react";

import { GET_USUARIO, GET_USUARIOS } from "../../../graphql/usuarios/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PrivateRoute from "../../../components/PrivateRoute";
import { REFRESH_TOKEN } from "../../../graphql/auth/mutations";
import NavBarFull from "../../../components/NavbarTodo";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import ButtonLoading from "../../../components/ButtonLoading";
import useFormData from "../../../hook/useFormData";
import { EDITAR_USUARIO } from "../../../graphql/usuarios/mutations";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Enum_EstadoUsuario } from "../../../utils/enums";
const UserIndex = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const [showModal, setShowModal] = React.useState(false);
  const { _id } = useParams();

  
  const { data, error, loading } = useQuery(GET_USUARIOS, {
    refetchQueries: [{ query: REFRESH_TOKEN }],
  });

  const abrirModal = (id) => {
    
    console.log("abrir modal", id);
    setShowModal(true);
    setidmodal(id);
  
  }
  const cerrarModal = () => {
    
  
    setShowModal(false);
    setidmodal('');
  
  }
  const [idmodal, setidmodal]=useState('');
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id:idmodal },
  });

  if (queryData) {
    console.log(queryData);
  }
  const [
    editarUsuario,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_USUARIO, { awaitRefetchQueries: true });
  
  const submitForm = (e) => {
    const _id= idmodal;
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    console.log("data servidor", data);
    console.log("data servidor de querydata", queryData);
  }, [data, queryData]);

  useEffect(() => {
    if (error) {
      toast.error("error consultando los usuarios");
    }
  }, [error]);

  if (loading) return <div className="bg-green-400">cargando.....</div>;
  return (
    <>
      <NavBarFull titulo="Usuarios :" subtitulo="Lista de Usuarios" />

      <div className="flex justify-center w-10/12">
        <table className="table">
          <thead>
            <tr  scope="col" class="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400">
        {/*       <th className="text-center">Id</th> */}
              <th className="pr-6">nombre </th>
              <th>Apellido</th>

              <th  class="text-center">correo</th>
              <th>Identificacion</th>
              <th  class="text-center">rol</th>
              <th  class="text-center">estado</th>
              <th class="pl-5" >Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.Usuarios.map((u) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={u._id}>
                    {/* <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white" >{u._id}</td> */}
                    <td  scope="col" class="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400">{u.nombre}</td>
                    <td>{u.apellido}</td>
                    <td>{u.correo}</td>
                    <td>{u.identificacion}</td>
                    <td  class="text-center">{u.rol}</td>
                    <td>{Enum_EstadoUsuario[u.estado]}</td>

                    <td class="pl-6">
                    <i    class="fas fa-pen text-green-600 hover:text-green-400 cursor-pointer" onClick={()=> abrirModal(u._id)}></i>
                       {/*  <button
                   
                          onClick={() =>  abrirModal(u._id)}
                          class=" bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-2 rounded"
                        >
                          Editar
                        </button> */}
                        {/*                           <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                         */}{" "}
                   
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {showModal ? (
          <>
            <div class="p-100 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="bg-gray-800 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-white  text-center ">Editar Usuario</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form}
                    className="grid grid-cols-3 gap-5 items-center justify-center   p-10"
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
                      label="Correo de la persona:"
                      type="email"
                      name="correo"
                      defaultValue={queryData?.Usuario.correo}
                      required={true}
                    />
                    <Input
                      label="Identificación de la persona:"
                      type="text"
                      name="identificacion"
                      defaultValue={queryData?.Usuario.identificacion}
                      required={true}
                    />
                    <Dropdown
                      label="Estado de la persona:"
                      name="estado"
                      defaultValue={queryData?.Usuario.estado}
                      required={true}
                      options={Enum_EstadoUsuario}
                    />
                    <span>Rol del usuario: {queryData?.Usuario.rol}</span>
                    <ButtonLoading
                    class="mr-10"
                      disabled={Object.keys(formData).length === 0}
                      loading={mutationLoading}
                      text="Actualizar"
                     
                    />
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      class="ml-6 border-2 border-red-500  rounded-lg text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => cerrarModal()
                      
                      
                      }
                    
                    >
                 
                      Cerrar
                    </button>
                    
                  
                  </div>
                  </form>
                  {/*footer*/}
                  
                </div>
              </div>
             
            </div>
            
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <br />
        <br />
      </div>
    </>
  );
};

export default UserIndex;
