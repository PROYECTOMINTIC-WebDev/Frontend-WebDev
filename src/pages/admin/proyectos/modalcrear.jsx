import React, { useEffect } from "react";
import { useState } from "react";
import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import ButtonLoading from "../../../components/ButtonLoading";
import Dialog from "@mui/material/Dialog";
import { Link } from "react-router-dom";
import { CREAR_PROYECTO } from "../../../graphql/proyectos/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USUARIOS } from "../../../graphql/usuarios/queries";
import useFormData from "../../../hook/useFormData";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Enum_TipoObjetivo } from "../../../utils/enums";
import { nanoid } from "nanoid";
import { ObjContext, useObj } from "../../../context/objContext";
const ModalCrear = () => {


  const [showDialog, setShowDialog] = useState(false);
  const { form, formData, updateFormData } = useFormData();
  const [listaUsuarios, setListaUsuarios] = useState({});
  const { data, loading, error } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: "LIDER", estado: "AUTORIZADO" },
    },
  });

  const [
    crearProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_PROYECTO);

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
    console.log("data mutationssss", mutationData);
  });

  const submitForm = (e) => {
    e.preventDefault();
console.log("forme",formData);
    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);

    crearProyecto({
      variables: formData,
    });
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <div className=" flex flex-col items-center  ml-12  mb-12 mr-12">
          <div className="self-start">
            <Link to="/admin/proyectos">
              <i className="fas fa-arrow-left" />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Crear Nuevo Proyecto
          </h1>
          <form
            className="grid grid-cols-3 gap-5 items-center justify-center  "
            ref={form}
            onChange={updateFormData}
            onSubmit={submitForm}
          >
            <Input
              name="nombre"
              label="Nombre del Proyecto"
              required={true}
              type="text"
            />
            <Input
              className="pt-0"
              name="presupuesto"
              label="Presupuesto"
              required={true}
              type="number"
            />
            <Input
              name="fechaInicio"
              label="Fecha de Inicio"
              required={true}
              type="date"
            />
            <Input
              name="fechaFin"
              label="Fecha de Fin"
              required={true}
              type="date"
            />
            <Dropdown
              label="Líder"
              options={listaUsuarios}
              name="lider"
              required={true}
            />
            <Objetivos crear={true} />
         
            <ButtonLoading
              text="Crear Proyecto"
              loading={false}
              disabled={false}
            />
          </form>
        </div>
      </Dialog>
    </div>
  );
};

const Objetivos = (crear) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    padding: 300,
    overflow: "scroll",
    height: 500,
    bgcolor: "background.paper",
    border: "",
    boxShadow: 45,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const styles = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
   
    bgcolor: "background.paper",
    border: "",
    boxShadow: 45,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const eliminarObjetivo = (id) => {  
    setListaObjetivos(listaObjetivos.filter((objetivo) => objetivo.props.id !== id));
  }
  const ComponenteObjetivoAgregado = () => {
    const id= nanoid();
  
      return <FormObjetivos  key={id}  id={id}/>
  }
  const [listaObjetivos, setListaObjetivos] = useState([]);
  useEffect(() => {
    console.log("lista objetivos",listaObjetivos);
 }, [listaObjetivos]);
  return (
    <ObjContext.Provider value={{ eliminarObjetivo}}>
    <div>
      <Button onClick={handleOpen}>Agregar objetivos</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
       
          <Box  sx={{ ...style, width: 500 }}>
            <h2
              id="parent-modal-title"
              className="text-gray-500 text-2xl text-center"
            >
              Crear Objetivos
            </h2>

         
              <i 
               onClick={() => setListaObjetivos([...listaObjetivos, ComponenteObjetivoAgregado()])}
              class="fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer "></i>
             
              {listaObjetivos.map((objetivo, index) => {
                return (
                 objetivo
                 
                );
              })}
        
          </Box>
        
      </Modal>
    </div>
    </ObjContext.Provider>
  );
};

const FormObjetivos = ({id}) => {

  const {eliminarObjetivo} = useObj()
  return (
    <div class="flex items-center ">
  

      <Input 
        name={`nested||objetivos||${id}||descripcion`}
     label="Descripcion" type="text" required={true}
      />
      <Dropdown 
        name={`nested||objetivos||${id}||tipo`}
      label="Tipo de Objetivo" options={Enum_TipoObjetivo}required={true}
            />

<i
onClick={() => eliminarObjetivo(id)}
  className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6'
  />      
    </div>
  );
};
export default ModalCrear;
