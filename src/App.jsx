import Index from './pages/Index';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Admin from './pages/Admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";


function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
