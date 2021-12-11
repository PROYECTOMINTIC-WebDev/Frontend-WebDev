import Index from "./pages/index/Index";
import Login from "./pages/auth/Login";
import Admin from "./pages/admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/globals.css';
/* import Adminusers from "./pages/admin/Adminusers"; */
import PrivateLayout from "./layout/PrivateLayout";
import AuthLayout from "./layout/AuthLayout";
import Registro from "./pages/auth/Registro";
import '@themesberg/flowbite';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  /* useQuery,
  gql */
} from "@apollo/client";
/* import PrivateLayout from "./layout/PrivateLayout";
 */
import { setContext } from '@apollo/client/link/context';

import UserIndex from "./pages/admin/usuarios/userIndex";
import EditarUsuario from "./pages/admin/usuarios/editar";
import Dashboard from "./pages/admin/dashboard";
import { AuthContext } from "./context/authContext";
import { useState ,useEffect} from "react";
import { Token } from "graphql";
import jwt_decode from 'jwt-decode';
import { UserContext } from "./context/userContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicLayout from "./layout/PublicLayout";
import Navbar from "./components/Navbar";
import IndexProyecto from "./pages/admin/proyectos";
import IndexPerfil from "./pages/perfil";
<script src="../path/to/@themesberg/flowbite/dist/flowbite.bundle.js"></script>

const httpLink = createHttpLink({
  uri: 'http://192.168.100.121:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [authToken, setauthToken]= useState('');
  const [userData, setUserData] = useState({});
  const setToken=(token)=>{
    setauthToken(token)
    if(token) {
      localStorage.setItem('token',JSON.stringify(token))
    }else{
      localStorage.removeItem("token")
    }
  }

  useEffect(() => {
    if(authToken){

      const decoded = jwt_decode(authToken)
      setUserData({
        _id:decoded._id,
        nombre:decoded.nombre,
        apellido:decoded.apellido,
        identificacion:decoded.identificacion,
        rol:decoded.rol,
        correo:decoded.correo
      })
      console.log("userData en obj",decoded)
    }
    if(userData){
      console.log("difgnjh",userData)

    }
  }, [authToken])


  return (
   <ApolloProvider  client={client}>
   <AuthContext.Provider value={{authToken,setauthToken,setToken}} >
  <UserContext.Provider   value={{ userData, setUserData }}>

    <BrowserRouter>
      <Routes>
      //ruta privada de administrador
        <Route path="/admin" element={<PrivateLayout />}>
          
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/Dashboard" element={<Dashboard />} />
        <Route path="/admin/perfil" element={<IndexPerfil />} />
        <Route path="/admin/proyectos" element={<IndexProyecto />} />
        <Route path="/admin/usuarios" element={
        <PrivateRoute  roleList={["ADMINISTRADOR"]}>
        <UserIndex />
       </PrivateRoute>
        }
        
        />  <Route path="/admin/usuarios/:_id" element={<UserIndex />} />
        </Route>

        {/* RUTAS PUBLICAS  */}
        <Route path="/" element={<PublicLayout />}>

        <Route path="/" element={<Index />} />
        </Route>
        
     {/*    <Route path="/login" element={<Login />} /> */}
        <Route path="/registro" element={<Registro />} />
      {/*   <Route path="/admin" element={<Admin />} /> */}
      //ruta de autenticacion de registro
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='registro' element={<Registro />} />
            <Route path='login' element={<Login />} />
          </Route>

      </Routes>
    </BrowserRouter>

    </UserContext.Provider>
    </AuthContext.Provider>
   </ApolloProvider>
  );
}

export default App;
