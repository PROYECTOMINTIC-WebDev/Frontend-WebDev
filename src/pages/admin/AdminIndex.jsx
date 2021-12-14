import React from 'react'
import NavBarFull from '../../components/NavbarTodo'
import PrivateComponent from '../../components/PrivateComponent'

const AdminIndex = () => {
    return (
        <div>
        
        <NavBarFull   titulo="AdminIndex :"  subtitulo="estudiantes" />
        <PrivateComponent    roleList={['LIDER']}>
        <div>
            INDICE DEL MODULO ADMIN
        </div>
        </PrivateComponent>
         
        </div>
    )
}

export default AdminIndex
