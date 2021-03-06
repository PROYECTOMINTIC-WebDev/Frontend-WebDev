import React, { useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useUser } from "../context/userContext";
import Avatar from "@mui/material/Avatar";

import { blueGrey } from "@mui/material/colors";

const NavBarFull = ({ titulo, subtitulo, subtitulo2 }) => {
  const { userData } = useUser();
  if (userData) {
    console.log("estos son los usuarios de tt", userData);
  }
  console.log("estos son los usuarios de ");
  useEffect(() => {}, [userData]);
  const estadoNombre = () => {
    if (userData) {
      return userData.nombre;
    } else {
      return <></>;
    }
  };
  const nombress = () => {
    if (userData) {
      return userData.apellido;
    } else {
      return <></>;
    }
  };
  return (
    <div className=" shadow-md h-16 bg-gray-50 text-black flex items-center w-full mb-2 rounded-b-3xl">
      <div className="flex z-10 text-white justify-end w-3/4">
        <nav className="flex items-center ">
          <div>
            <ul className="flex items-center justify-center text-center">
              <li className="text-black ml-1 mr-4 text-3xl font-semibold">
                {titulo}
              </li>
              <li className="ml-1 mr-4 text-2xl font-semibold text-black ml-10">
                {subtitulo}
              </li>
              <li className="ml-1 mr-4 text-2xl font-semibold ">
                {subtitulo2}
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className=" flex justify-end items-center m-2 w-1/3 h-full rounded-full  bg-bg-indigo-400">
        <label class="w-max  text-gray-500 text mr-4">
          {" "}
          {estadoNombre()} {nombress()}{" "}
        </label>
        <Avatar sx={{ bgcolor: blueGrey[900] }} src="/broken-image.jpg " />
        {/* <i class="far fa-user     border-gray-500   p-6    "></i> */}
        {/*                         <img alt ="Foto" src="fas-fas-user" className="m-2  h-4/5  rounded-lg  bg-bg-indigo-400   flex-col-reverse" />
         */}{" "}
      </div>
    </div>
  );
};

export default NavBarFull;