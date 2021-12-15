import React, { useEffect } from "react";
import { useState } from "react";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import ButtonLoading from "../../../components/ButtonLoading";
import { Link } from "react-router-dom";
import { CREAR_PROYECTO } from "../../../graphql/proyectos/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USUARIOS } from "../../../graphql/usuarios/queries";
import useFormData from "../../../hook/useFormData";

import { Enum_TipoObjetivo } from "../../../utils/enums";
import { nanoid } from "nanoid";
import { ObjContext, useObj } from "../../../context/objContext";
const Crearproyecto = () => {
    const { form, formData, updateFormData } = useFormData();
    const [listaUsuarios, setListaUsuarios] = useState({});
    const { data, loading, error } = useQuery(GET_USUARIOS, {
      variables: {
        filtro: { rol: 'LIDER', estado: 'AUTORIZADO' },
      },
    });
  
    const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
      useMutation(CREAR_PROYECTO);
  
    useEffect(() => {
      console.log(data);
      if (data) {
        const lu = {};
        data.Usuarios.forEach((elemento) => {
          lu[elemento._id] = elemento.correo;
        });
  
        setListaUsuarios(lu);
      }
    }, [data]);
  
    useEffect(() => {
      console.log('data mutation', mutationData);
    });
  
    const submitForm = (e) => {
      e.preventDefault();
  
      formData.objetivos = Object.values(formData.objetivos);
      formData.presupuesto = parseFloat(formData.presupuesto);
  
      crearProyecto({
        variables: formData,
      });
    };
  
    if (loading) return <div>...Loading</div>;
  
    return (
      
      <div className=' insert bg-cover flex flex-col items-center   h-screen w-screen overflow-scroll   mr-10  pr-10   '>
      
        <div className='self-start   pl-10 pt-5  transform hover:scale-110 transition duration-600  h-400   mr-10'>
          <Link to='/admin/proyectos'>
            <i className='fas fa-arrow-left' />
          </Link>
        </div>
        <h1 className='text-3xl font-bold text-gray-900 FuzzyBubbles  ml-16 '>Crear Nuevo Proyecto</h1>
        <form
        className='   items-center  justify-center  FuzzyBubbles ml-16'
       
        ref={form} onChange={updateFormData} onSubmit={submitForm}>
          <Input name='nombre' label='Nombre del Proyecto' required={true} type='text' />
          <Input name='presupuesto' label='Presupuesto del Proyecto' required={true} type='number' />
          <Input name='fechaInicio' label='Fecha de Inicio' required={true} type='date' />
          <Input name='fechaFin' label='Fecha de Fin' required={true} type='date' />
          <Dropdown label='Líder' options={listaUsuarios} name='lider' required={true} />
         
          <Objetivos
         
          />        
        
          <ButtonLoading text='Crear Proyecto' loading={false} disabled={false} />
        </form>
      </div>
    );
  };
  
  const Objetivos = () => {
    const [listaObjetivos, setListaObjetivos] = useState([]);
    const [maxObjetivos, setMaxObjetivos] = useState(false);
  
    const eliminarObjetivo = (id) => {
      setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
    };
  
    const componenteObjetivoAgregado = () => {
      const id = nanoid();
      return <FormObjetivo key={id} id={id} />;
    };
  
    useEffect(() => {
      if (listaObjetivos.length > 4) {
        setMaxObjetivos(true);
      } else {
        setMaxObjetivos(false);
      }
    }, [listaObjetivos]);
  
    return (
      <ObjContext.Provider value={{ eliminarObjetivo }}>
        <div>
          <span>Objetivos del Proyecto</span>
          {!maxObjetivos && (
            <i
              onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}
              className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
            />
          )}
          {listaObjetivos.map((objetivo) => {
            return objetivo;
          })}
        </div>
      </ObjContext.Provider>
    );
  };
  
  const FormObjetivo = ({ id }) => {
    const { eliminarObjetivo } = useObj();
    return (
      <div className='flex items-center justify-around '>
        <Input
        
        className='m-0 p-0'
          name={`nested||objetivos||${id}||descripcion`}
          label='Descripción'
          type='text'
          required={true}
      
        />
        <Dropdown
        className='ml-15'
          name={`nested||objetivos||${id}||tipo`}
          options={Enum_TipoObjetivo}
          label='Tipo de Objetivo'
          required={true}
        />
        <i
          onClick={() => eliminarObjetivo(id)}
          className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6'
        />
      </div>
    );
  };

export default Crearproyecto
