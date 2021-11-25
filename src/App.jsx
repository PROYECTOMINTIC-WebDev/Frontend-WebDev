import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
import Registro from "./pages/registro/Registro";
import Admin from "./pages/admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Adminusers from "./pages/admin/Adminusers";
import PrivateLayout from "./layout/PrivateLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateLayout/>} />
        <Route path="" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/usuarios" element={<Adminusers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
