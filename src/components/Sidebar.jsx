
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const SidebarLinks = () => {
  return (
  <ul className='mt-12 p ' >
    <SidebarRoute to='/admin/Dashboard' title='Dashboard' icon='fas fa-home' />
    <SidebarRoute to='/admin/usuarios' title='Usuarios' icon='fas fa-users '/>
    <SidebarRoute to='/admin/' title='otro' icon='fas fa-users '/>
    
    
  </ul>
  );
};



const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src='logo.png' alt='Logo' className='h-16' />
      <span className='my-2 text-xl font-bold text-gray-300 text-center  '>Gestion de Proyectos</span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full  '>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex bg-gray-700'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
   
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-indigo-700'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-indigo-300 focus:shadow-outlin'
        }
      >
        <div className='flex items-center'>
          <i  className={`${icon} w-8`} />
          <span className='text-sm  ml-2 pb-4  pt-4'>{title}</span>
        </div>
      </NavLink>
   
  );
};

export default Sidebar;
