import React from "react";
import ReactLoading from 'react-loading';
// boton con efecto de carga de carga 
const ButtonLoading = ({ disabled, loading, text }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="bg-black text-white font-bold text-lg py-3 px-6  rounded-xl hover:bg-gray-800 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
    >
      {loading ? <ReactLoading type="spin" height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;
