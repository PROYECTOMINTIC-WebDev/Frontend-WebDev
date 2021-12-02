import React from 'react'
import { Outlet } from 'react-router-dom'
const Index = () => {
    return (
        <div  >
           <div className=' '> pagina publica </div>
            <Outlet/>
        </div>
        
    )
}

export default Index
