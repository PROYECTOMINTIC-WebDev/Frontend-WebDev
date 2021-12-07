import React from "react";
import { Link } from "react-router-dom";
export default function FooterLocal(props) {
    return (
        <div className="mt-0   scroll-y px-8 md:px-12 flex flex-col items-center w-full bg-primary-800 text-white">
            <div className="flex items-center">
                <h1 className="py-5 text-center">
                 
                </h1>
            </div>
            <div className="mt-0 text-gray-900  flex flex-col md:flex-row justify-center items-center md:items-start text-center md:text-left w-full pb-12 border-b-2">
                <div className="  md:w-1/3 flex flex-col pb-6 md:pb-0">
                    <h4   className="font-bold dark:text-white" >Navegación</h4>
                  <ul>
                      <li>Proyectos</li>
                      <li>Inscripciones</li>
                      <li>Usuarios</li>
                      <li>Avances</li>
                      <li></li>
                  </ul>

                </div>
                
                <div className="md:w-1/3 flex flex-col pb-6 md:pb-0">
                    <h4    className="font-bold dark:text-white" >Aspectos Legales</h4>
                   Informacion General
                   <br />
                   Politicas de Privacidad
                </div>
                <div className="  md:w-1/3 flex flex-col items-center md:items-start">
                    <h4  className="font-bold dark:text-white">Habla con nosotros</h4>
                    <ul>
                        <li>
                            <Link to="">manuelguma25@gmail.com</Link>
                        </li>
                        <li>
                            <Link to="">+57 300 398 7175</Link>
                        </li>
                        <li>
                            <Link to="">Facebook</Link>
                        </li>
                        <li>
                            <Link to="">LinkedIn</Link>
                        </li>
                        <li>
                            <Link to="">Twitter</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center py-12">
                <div className="text-gray-900 md:w-1/3 flex justify-start pb-6 md:pb-0">
                    <img  alt="Logo WebDev" />
                </div>
                <div className="text-gray-900 md:w-1/3 flex justify-center text-center pb-6 md:pb-0">
                    © 2021 WebDev. All Rights Reserved.
                </div>
                <div className="  text-gray-900 md: w-1/3 flex justify-evenly ">
                  
                  
                    <Link to="">
                    <i class="fab fa-facebook"></i>

                    </Link>
                    <Link to="">
                    <i class="fab fa-instagram"></i>
                    </Link>
                    <Link to="">
                    <i class="fab fa-twitter"> </i>
                    </Link>
                </div>
            </div>
        </div>
    );
}