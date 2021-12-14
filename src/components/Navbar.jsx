import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div >
        <div class="bg-white bg-opacity-100 shadow-sm  fixed left-0 right-0 z-10  mb- ">
      
      <nav class=" mb-0 bg-green border-gray-200  px-2 sm:px-4 py-2.5  dark:bg-gray-800  ">
        <div class="container mx-auto flex flex-wrap items-center justify-between  mb-0">
          <a href="#" class="flex">
            <svg
              class="h-10 mr-3"
              viewBox="0 0 52 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
                fill="#76A9FA"
              />
              <path
                d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
                fill="#A4CAFE"
              />
              <path
                d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
                fill="#1C64F2"
              />
            </svg>
            <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
              {" "}
              WebDev
            </span>
          </a>
          <div class="flex md:order-2   mt-2   ">
            <NavLink to="/auth/login">
              <button
                type="button"
                class="  text-white bg-gray-800 hover:bg-white border border-gray-800 hover:text-gray-900   focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
              >
                Login
              </button>
            </NavLink>
            <NavLink to="/auth/registro">
              <button
                type="button"
                class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Regístrate
              </button>
            </NavLink>
          </div>
        </div>
      </nav>
      </div>
    </div>
  );
};

export default Navbar;
