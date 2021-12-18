import React, { useEffect } from "react";
import Input from "../../components/Input";
import ButtonLoading from "../../components/ButtonLoading";
import { Link } from "react-router-dom";
import useFormData from "../../hook/useFormData";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/auth/mutations";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Icons } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [
    login,
    { data: dataMutation, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN);
  const { form, formData, updateFormData } = useFormData();

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };
  useEffect(() => {
    console.log("data mutation login", dataMutation);
    console.log("data mutation error", mutationError);
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate("/admin");
      }
     if (dataMutation.login.error) {
      console.log("eerr",dataMutation.login.error);
    }}
  }, [dataMutation, setToken, navigate, mutationError]);

  return (
    <div className="flex  items-center justify-center w-full h-full">
      <div className=" flex bg-black bg-hero-pattern bg-cover w-6/12 relative h-full  ">
      </div>
      <div className="w-3/12 relativeh-full mr-80 ml-32">

        {/* <i className ="fas fa-drafting-compass text-indigo-500 text-5xl text-center"></i> */}
        <h1 className= "text-gray-900 text-center m-5 text-3xl FuzzyBubbles font-black ml-36  flex flex-justify-between">
          Gestión de Proyectos
          WebDev
        </h1>

        <h1 className="text-xl font-bold text-gray-900 text-center ml-32">
          Iniciar Sesión
        </h1>
        <form
          className="flex flex-col ml-32"
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
        >
          <Input name="correo" type="email" label="Correo" required={true} />
          <Input
            name="password"
            type="password"
            label="Contraseña"
            required={true}
          />
            {dataMutation && dataMutation.login.error?  <div>
          <div class="float    flex flex-row bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800" role="alert">
  <svg class="w-5 h-5 inline flex-shrink-0 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  <div>
    <span class="font-medium">Error: </span> {dataMutation.login.error}.
  </div>
</div>
           </div>: ''}
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text="Regístrate"
          />
        
       
        </form>
        <span className='ml-40 '>¿No tienes una cuenta?</span>
        <Link to="/auth/registro">
          <span className="text-blue-700 ml-52 ">Regístrate</span>
        </Link>
      
      </div>
    </div>
  );
};

export default Login;
