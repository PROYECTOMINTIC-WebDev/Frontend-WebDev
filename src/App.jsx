import Index from "./pages/index/Index";
import Login from "./pages/auth/Login";
import Admin from "./pages/admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/globals.css';
import Sidebar from "./modules/sidebar/sidebar";
/* import Adminusers from "./pages/admin/Adminusers"; */
import PrivateLayout from "./layout/PrivateLayout";
import AuthLayout from "./layout/AuthLayout";
import Registro from "./pages/auth/Registro";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  /* useQuery,
  gql */
} from "@apollo/client";
/* import PrivateLayout from "./layout/PrivateLayout";
 */
import UserIndex from "./pages/admin/usuarios/userIndex";
import EditarUsuario from "./pages/admin/usuarios/editar";
import Dashboard from "./pages/admin/dashboard";
import { AuthContext } from "./context/authContext";
import { useState } from "react";
import { Token } from "graphql";

const client = new ApolloClient({
  uri:'http://192.168.100.121:4000/graphql',
  
  cache: new InMemoryCache()
});

function App() {
  const [authToken, setauthToken]= useState('');

  const setToken=(token)=>{
    setauthToken(token)
    if(token) {
      localStorage.setItem('token',JSON.stringify(token))
    }
  }
  return (
   <ApolloProvider  client={client}>
   <AuthContext.Provider value={{setToken}} >
  
    <BrowserRouter>
      <Routes>
      //ruta privada de administrador
        <Route path="/admin" element={<PrivateLayout />}>
          
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/Dashboard" element={<Dashboard />} />
        <Route path="/admin/usuarios" element={<UserIndex />} />
        <Route path="/admin/usuarios/editar/:_id" element={<EditarUsuario />} />

        </Route>

        <Route path="" element={<Index />} />
     {/*    <Route path="/login" element={<Login />} /> */}
        <Route path="/registro" element={<Registro />} />
      {/*   <Route path="/admin" element={<Admin />} /> */}
        <Route path="/sidebar" element={<Sidebar />} />
      //ruta de autenticacion de registro
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='registro' element={<Registro />} />
            <Route path='login' element={<Login />} />
          </Route>

      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
   </ApolloProvider>
  );
}

export default App;
