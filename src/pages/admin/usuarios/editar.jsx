
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_USUARIO, GET_USUARIOS } from "../../../graphql/usuarios/queries";
import { Input } from "@mui/material";
import Dropdown from "../../../components/Dropdown";
import ButtonLoading from "../../../components/ButtonLoading";
import useFormData from "../../../hook/useFormData";
import { EDITAR_USUARIO } from '../../../graphql/usuarios/mutations';
const EditarUsuario = () => {
  
 return (
   <div>
      <h1>Editar Usuario</h1>
   </div>
 )
};

export default EditarUsuario;
