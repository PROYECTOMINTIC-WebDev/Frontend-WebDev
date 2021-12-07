import React from 'react'
import NavBarFull from '../../components/NavbarTodo'
import PrivateComponent from '../../components/PrivateComponent'

const Dashboard = () => {
    return (
        <div>
        
        <NavBarFull   titulo="Dashboard :"  subtitulo="estudiantes" />
        <PrivateComponent    roleList={['LIDER']}>
        <div>
            DASHBOARD DE LOS NOMBRES DE LOS INTEGRANTES
        </div>
        </PrivateComponent>
         
        </div>
    )
}

export default Dashboard
