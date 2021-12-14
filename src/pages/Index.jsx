import React from 'react'
const Index = () => {
    return (
    <div>
        <div class="bg-gray-50 pl-20 relative h-777 pb-12  pt-40 mt-100 center">
            <p class="text-4xl font-extrabold dark:text-white">Gestión de Proyectos WebDev</p>
        </div>
        
        <a href="#" class="mt-7 ml-8 flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white hover:bg-gray-100 border shadow-md items-center dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src="https://flowbite.com/docs/images/blog/image-4.jpg" alt=""/>
          <div class="p-4 flex flex-col justify-between leading-normal">
            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Tecnologías como: React, MongoDB y GraphQL</h5>
            <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Ayudaron a desarrollar el sistemas de gestión de proyectos, esta es una disciplina que se basa en utilizar principios, procedimientos y políticas establecidos para guiar con éxito un proyecto desde su concepción hasta su finalización.</p>
          </div>
        </a>
    </div>
  );
};

export default Index
