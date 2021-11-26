import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
import Registro from "./pages/registro/Registro";
import Admin from "./pages/admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./modules/sidebar/sidebar";

import Adminusers from "./pages/admin/Adminusers";
import PrivateLayout from "./layout/PrivateLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateLayout />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/usuarios" element={<Adminusers />} />

        </Route>
        <Route path="" element={<Index />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
