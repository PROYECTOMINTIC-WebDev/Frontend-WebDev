//Funciones de React y estilos
import { useState ,useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  /* useQuery,
  gql */
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import '@themesberg/flowbite';
import './styles/globals.css';

// import { Token } from "graphql";

//Contextos y Layouts
import { AuthContext } from "./context/authContext";
import { UserContext } from "./context/userContext";
import PrivateRoute from "./components/PrivateRoute";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import AuthLayout from "./layout/AuthLayout";

//Páginas
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Registro from "./pages/auth/Registro";
import Admin from "./pages/admin/Admin";
import IndexPerfil from "./pages/perfil";
// import Formulario from "./pages/proyectos/formulario";
import ModalCrear from "./pages/admin/proyectos/modalcrear";
import Crearproyecto from "./pages/admin/proyectos/crearproyecto";
import UserIndex from "./pages/admin/usuarios/userIndex";
import AdminIndex from "./pages/admin/AdminIndex";
import IndexProyecto from "./pages/admin/proyectos";
import FormularioProyectos from "./pages/admin/proyectos/formulario";
import IndexAvances from "./pages/admin/proyectos/avances/Index";
import IndexAvances2 from "./pages/admin/proyectos/avances/index2";
import EditarAvance from "./pages/admin/proyectos/avances/editar";
import CrearAvance from "./pages/admin/proyectos/avances/crearAvance";

// import EditarUsuario from "./pages/admin/usuarios/editar";

<script src="../path/to/@themesberg/flowbite/dist/flowbite.bundle.js"></script>

const httpLink = createHttpLink({
  uri: 'https://webdev-back.herokuapp.com/graphql',
  uri: 'http://localhost:4000/graphql',
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
              <Route path="/admin" element= {<PrivateLayout/>}>
                <Route path="/admin" element= {<Admin/>} />
                <Route path="/admin/index" element= {<AdminIndex/>}/>
                <Route path="/admin/perfil" element= {<IndexPerfil/>} />
                
                <Route path="/admin/proyectos/avances" element= {<IndexAvances/>} />
                <Route path="/admin/avances" element= {<IndexAvances2/>} />
                <Route path="/admin/avances/crear" element={<CrearAvance/>} /> 
                <Route path="/admin/proyectos/editar" element={<EditarAvance/>} />   
                <Route path="/admin/crearproyecto" element={<Crearproyecto />} />
                <Route path="/admin/proyectos" element= {<IndexProyecto/>} />
                <Route path="/admin/proyectos/editar" element={<FormularioProyectos/>} />   
                <Route path="/admin/usuarios" element= {
                <PrivateRoute  roleList={["ADMINISTRADOR"]}>
                  <UserIndex />
                </PrivateRoute>}/>  
                <Route path="/admin/usuarios/:_id" element={<UserIndex />} />
              </Route>

              <Route path="/" element={<PublicLayout/>}>
                <Route path="/" element={<Index/>}/>
              </Route>

              <Route path="/registro" element={<Registro/>} />
              <Route path='/auth' element={<AuthLayout/>}>
                <Route path='registro' element={<Registro/>} />
                <Route path='login' element={<Login/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
