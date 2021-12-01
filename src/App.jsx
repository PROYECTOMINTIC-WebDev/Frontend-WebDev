import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
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
import UserIndex from "./pages/usuarios/userIndex";
import EditarUsuario from "./pages/usuarios/editar";
import Dashboard from "./pages/admin/dashboard";

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  
  cache: new InMemoryCache()
});

function App() {
  return (
   <ApolloProvider  client={client}>
   
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
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      {/*   <Route path="/admin" element={<Admin />} /> */}
        <Route path="/sidebar" element={<Sidebar />} />
      //ruta de autenticacion de registro
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='registro' element={<Registro />} />
          </Route>

      </Routes>
    </BrowserRouter>
      
   </ApolloProvider>
  );
}

export default App;
