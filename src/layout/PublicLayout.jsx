import { Outlet } from "react-router"
import FooterLocal from "../components/Footer"
import Navbar from "../components/Navbar"

const PublicLayout = () => {
    return (
        <div>
          <Navbar/>
          <Outlet/>
          <FooterLocal/>
        </div>
    )
}

export default PublicLayout
