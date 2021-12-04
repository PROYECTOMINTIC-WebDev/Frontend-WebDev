import React from 'react'
import PrivateComponent from '../../components/PrivateComponent'

const Dashboard = () => {
    return (
        <PrivateComponent    roleList={['LIDER']}>
        <div>
            DASHBOARD DE LOS NOMBRES DE LOS INTEGRANTES
        </div>
        </PrivateComponent>
     
    )
}

export default Dashboard
