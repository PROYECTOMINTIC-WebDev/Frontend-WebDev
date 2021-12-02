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
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate("/admin/Dashboard");
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className="flex  items-center justify-center w-full h-full">
      <div className=" bg-black w-6/12  relative mr-72 ml-25 h-full object-center img_login "></div>
      <div className="w-3/12 mr-80">
        <i class="fas fa-drafting-compass text-indigo-500 ml-24 text-5xl"></i>
        <h1 className=" text-gray-900 text-center m-5 text-3xl FuzzyBubbles font-black ">
          Prisma Lab
        </h1>

        <h1 className="text-xl font-bold text-gray-900 text-center ">
          Iniciar sesión
        </h1>
        <form
          className="flex flex-col"
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
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text="Iniciar Sesión"
          />
        </form>
        <span>¿No tienes una cuenta?</span>
        <Link to="/auth/registro">
          <span className="text-blue-700">Regístrate</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
