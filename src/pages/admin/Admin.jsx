import React from 'react'
import { Outlet } from 'react-router-dom'
const Admin = () => {
    return (
        <div className='ml-12'>
           <div className='bg-yellow-500 ml-32'> pagina de administracion</div>
           <Outlet/>
        </div>
    )
}

export default Admin
