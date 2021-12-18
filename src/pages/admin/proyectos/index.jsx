import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import PROYECTOS from "../../../graphql/proyectos/queries";
import { useMutation, useQuery } from "@apollo/client";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PrivateComponent from "../../../components/PrivateComponent";
import useFormData from "../../../hook/useFormData";
import Dropdown from "../../../components/Dropdown";
import ButtonLoading from "../../../components/ButtonLoading";
import { Enum_EstadoProyecto} from "../../../utils/enums";
import { Enum_FaseProyecto} from "../../../utils/enums";
import NavBarFull from "../../../components/NavbarTodo";
import { styled } from "@mui/material/styles";
import { EDITAR_PROYECTOS } from "../../../graphql/proyectos/mutations";
import { EDITAR_FASE } from "../../../graphql/proyectos/mutations";
import ModalCrear from "./modalcrear";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

const IndexProyecto = () => {
  const AccordionStyled = styled((props) => <Card {...props} />)(
    ({ theme }) => ({
      backgroundColor: "#919191",
    })
  );

  const [proyecto, setproyecto] = useState({});
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const [EstadoObjetivo, setEstadoObjetivo] = useState();

  const handleClickOpen = (scrollType, objetivos) => () => {
    setEstadoObjetivo(objetivos);
    console.log("estos son los objetivos", objetivos);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data: queryData, loading, error } = useQuery(PROYECTOS);
  useEffect(() => {
    console.log("data de proyectos", queryData);
  }, [queryData]);
  if (loading) return <div>cargando...</div>;

  if (queryData.Proyectos) {
    return (
      <>
        <NavBarFull titulo="Proyectos :" subtitulo="Lista de Proyectos" />

        <div className="h-screen overflow-scroll  mb-50     ">
         <div className="absolute z-50 bottom-0 right-0 p-10  float-right  ">
       
         <Tooltip title="Crear"
         >
        
         
         <Link to="/admin/crearproyecto">
            <i class="fas fa-plus fa-2x   transform hover:scale-110 transition duration-600  h-400   mr-10"></i>
          </Link>
          </Tooltip>
         </div>
        
    
          <div className="   ">
            <div className="p-4 grid grid-cols-4 gap-3    w-auto h-auto">
              {queryData.Proyectos.map((proyecto) => {
                return (
                  <>
                    <CardProyectosAdministrador
                      key={proyecto._id}
                      proyecto={proyecto}
                      abrirmodal={handleClickOpen("paper", proyecto.objetivos)}
                    />
                  </>
                );
              })}
            </div>
          </div>

          <div>
            <div>
              {/*   <Button onClick={handleClickOpen('paper')}>mmm</Button>
               */}{" "}
              <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle
                  id="scroll-dialog-title"
                  class="bg-gray-900   p-5   text-white  font-extralight  text-2xl   shadow-lg"
                >
                  lista de Objetivos
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                  >
                    <div class="">
                      {EstadoObjetivo?.map((objetivo) => {
                        return (
                          <Objetivos
                            tipo={objetivo.tipo}
                            descripcion={objetivo.descripcion}
                          />
                        );
                      })}
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <> </>;
};

const Objetivos = ({ tipo, descripcion }) => {
  return (
    <div class="mx-4 ">
      <h1 class="text-gray-600  font-bold">-{tipo}</h1>

      <h1>{descripcion}</h1>
      <br></br>
    </div>
  );
};
const CardProyectosAdministrador = ({ proyecto, abrirmodal }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);
  const [showDialog3, setShowDialog3] = useState(false);
  const CardStyle = styled((props) => {
    const { expand, ...other } = props;
    return <Card {...other} />;
  })(({ theme, expand }) => ({
    backgroundColor: "#ffffff",
    boxShadow:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -2px rgb(0 0 0 / 0.1);",
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const abrirModalCrearProyecto = () => {
    setShowDialog2(true);
  };
  return (
    <>
      <div class=" transform hover:scale-110 transition duration-700  h-400  ">
        <CardStyle
          sx={{ maxWidth: 300 }}
          aria-label="recipe"
          className=" shadow-lg mr-6  mb-5  w-22  transition duration-700   w-200  basic-1/2"
        >
          <CardContent class="ml-3   mb-12">
            <Typography
              gutterBottom
              variant="h12"
              component="div"
              class="text-gray-500 "
            >
              {proyecto.nombre} -{" "}
              <PrivateComponent roleList={["ADMINISTRADOR"]}>

  
                <i
                  className="ml-2 fas fa-edit text-yellow-600 hover:text-yellow-400"
                  onClick={() => {
                    setShowDialog(true);
                  }}
                />
              {/* ESTO SERIA PARA QUE APAREZCA EN EL CARD PARA CAMBIAR LA FASE DEL PROYECTO */}
                <i
                  className="ml-2 fas fa-edit text-black-600 hover:text-yellow-400"
                  onClick={() => {
                    setShowDialog3(true);
                  }}
                />

                
                <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                  <i class="fas fa-ellipsis-v  hover:bg-gray-300 rounded-lg   float-right  p-2"></i>
                </PrivateComponent>

                
                
              </PrivateComponent>
            </Typography>
       
            <Typography variant="body2" color="text.secondary">
              <div className="  ">
                <div className="pt-2 pb-2">
                  <span class=" text-gray-700 "> LIDER:</span>{" "}
                  {proyecto.lider.nombre}

                </div>

                <div>

                  {proyecto.estado === "ACTIVO" ? (
                      <span class=" display-none bg-green-500 rounded-2xl   text-white p-1 ">
                        {proyecto.estado}
                      </span>
                    ) : (
                      <span class=" display-none bg-red-500 rounded-2xl   text-white p-1  ">
                        {proyecto.estado}
                      </span>
                    )}

                    <br></br>
                    <br></br>

                    {proyecto.fase === "DESARROLLO" ? (
                      <span class=" display-none bg-yellow-300 rounded-2xl   text-white p-1 ">
                        {proyecto.fase}
                      </span>
                    ) : (
                      <span class=" display-none bg-blue-500 rounded-2xl   text-white p-1  ">
                        {proyecto.fase}
                      </span>
                    )}

                </div>
                  
              </div>
              <br></br>

             { /*PROBANDO PARA LA FASE*/}

             
            </Typography>

           




          </CardContent>
          <CardActions>
            <Button
              size="small"
              class="text-blue-400  font-bold   hover:bg-gray-200 rounded-lg  p-2"
            >
              Inscribirme
            </Button>
            <Button
              size="small"
              class="text-blue-400  font-bold   hover:bg-gray-200 rounded-lg  p-2"
              onClick={abrirmodal}
            >
              Ver Objetivos
            </Button>
          </CardActions>
        </CardStyle>
        <Dialog
          open={showDialog}
          onClose={() => {
            setShowDialog(false);
          }}
        >
          <FormEditProyecto _id={proyecto._id} />

        </Dialog>
        {/*  ESTO ES PARA LA FASE DEL PROYECTO */}
        <Dialog
          open={showDialog3}
          onClose={() => {
            setShowDialog3(false);
          }}
        >
          <FormEditarFaseProyecto _id={proyecto._id} />
        </Dialog>

        {/*     modal de crear proyecto */}
      </div>
    </>
  );
};
const FormCrearProyecto = ({ _id }) => {
  return (
    <div className="p-4">
      <h1 className="font-bold  shadow-lg">Crear un nuevo Proyecto</h1>

      <br></br>

      <label for="">
        <input type="text" placeholder="Nombre del Proyecto" />
      </label>
      <label for="">
        <input type="text" placeholder="Nombre del Proyecto" />
      </label>
      <label for="">
        <input type="text" placeholder="Nombre del Proyecto" />
      </label>
    </div>
  );
};
const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [
    EditarEstadoProyecto,
    { data: dataMutation, loading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTOS);

  const submitForm = (e) => {
    e.preventDefault();
    EditarEstadoProyecto({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (dataMutation) {
      toast.success('Estado actualizado con éxito');
    }
  }, [dataMutation]);

  useEffect(() => {
    if (mutationError) {
      toast.error('No se pudo actualizar el estado del proyecto');
    }
  }, [mutationError]);
  return (
    <div className="p-4">
      <h1 className="font-bold">Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <Dropdown
          label="Estado del Proyecto"
          name="estado"
          options={Enum_EstadoProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};


/* PARA CAMBIAR LA FASE */

const FormEditarFaseProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [
    EditarFaseProyecto,
    { data: dataMutation, loading, error: mutationError },
  ] = useMutation(EDITAR_FASE);

  const submitForm = (e) => {
    e.preventDefault();
    EditarFaseProyecto({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (dataMutation) {
      toast.success('Fase actualizada con éxito');
    }
  }, [dataMutation]);

  useEffect(() => {
    if (mutationError) {
      toast.error('No se pudo actualizar la fase del proyecto');
    }
  }, [mutationError]);
  return (
    <div className="p-4">
      <h1 className="font-bold">Modificar Fase del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <Dropdown
          label="Fase del Proyecto"
          name="fase"
          options={Enum_FaseProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

/*FIN  */

export default IndexProyecto;
