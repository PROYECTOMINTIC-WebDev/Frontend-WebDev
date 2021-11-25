import React from 'react'
import { Outlet } from 'react-router-dom'
const Index = () => {
    return (
        <div  >
           <div className=' ml-52 h-screen bg-gray-800 '> index </div>
            <Outlet/>
        </div>
        
    )
}

export default Index
