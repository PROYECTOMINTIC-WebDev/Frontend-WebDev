import React from 'react';
import Input from "../../components/Input";

const Formulario = () => {
    return (
        <div>
            <h1>Editar proyecto</h1>
            <Input label="ID del proyecto" name="ID del proyecto" type="String" required />
            <Input label="Nombre proyecto" name="Nombre proyecto" type="text" required />
            <Input label="Objetivo General" name="Objetivo General" type="text" required />
            <Input label="Objetivo Especifico" name="Objetivo Especifico" type="text" required />
             <Input label="Presupuesto" name="Presupuesto" type="number" required /> 
             <Input label="Fecha Inicio" name="Fecha Inicio" type="date" required /> 
             <Input label="Fecha Fin" name="Fecha Fin" type="date" required />        
             <Input label="Estado" name="Estado" type="text" required />   
             <Input label="Fase" name="Fase" type="text" required /> 
             <button className="bg-black text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-gray-800 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700">Actualizar</button>                 
        </div>
    )
};


export default Formulario;
