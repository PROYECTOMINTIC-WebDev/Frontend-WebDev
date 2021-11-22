import React from 'react'

const sidebar = () => {
    return (
        <div className="app flex h-full fixed w-44 flex-col bg-black rounded-r-3xl">

      <div className="h-full mt-24 text-base justify-between flex flex-col ">
        <div>
          <ul className="flex flex-col ">
            
            <button className='text-left hover:bg-gray-500 ml-4 rounded-l-xl  text-gray-300 text-xs'>
            <i class="fas fa-users-cog text-gray-600 text-base ml-3 mb-5 mt-2 mr-2 "></i>Administracion</button>
            <button className='text-left hover:bg-gray-500 ml-4 rounded-l-xl  text-gray-300 text-xs'>
            <i class="fas fa-sign-in-alt text-gray-600 text-base ml-3 mb-5 mt-2 mr-2"></i>Cerrar Sesión </button>
          </ul>
        </div>
      </div>
    </div>
    
    )
}

export default sidebar
