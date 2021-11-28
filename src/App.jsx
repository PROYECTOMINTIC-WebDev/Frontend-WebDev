import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/globals.css';
import Sidebar from "./modules/sidebar/sidebar";
import Adminusers from "./pages/admin/Adminusers";
import PrivateLayout from "./layout/PrivateLayout";
import AuthLayout from "./layout/AuthLayout";
import Registro from "./pages/auth/Registro";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      //ruta privada de administrador
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/usuarios" element={<Adminusers />} />
        </Route>

        <Route path="" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/sidebar" element={<Sidebar />} />
      //ruta de autenticacion de registro
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='registro' element={<Registro />} />
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
