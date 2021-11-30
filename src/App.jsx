import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
import Registro from "./pages/registro/Registro";
import Admin from "./pages/admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./modules/sidebar/sidebar";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  /* useQuery,
  gql */
} from "@apollo/client";
import PrivateLayout from "./layout/PrivateLayout";
import UserIndex from "./pages/usuarios/userIndex";
import EditarUsuario from "./pages/usuarios/editar";


const client = new ApolloClient({
  uri:'http://192.168.100.250:4000/graphql',
  
  cache: new InMemoryCache()
});



function App() {
  return (
   <ApolloProvider  client={client}>
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateLayout />}>
          
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/usuarios" element={<UserIndex />} />
        <Route path="/admin/usuarios/editar/:_id" element={<EditarUsuario />} />

        </Route>
        <Route path="" element={<Index />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
      
   </ApolloProvider>
  );
}

export default App;
