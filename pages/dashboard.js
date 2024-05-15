import { useState, useEffect } from 'react';
import HeaderUser from '../components/HeaderUser';
import GodDashboard from '../components/GodDashboard';
import AdminUsers from '../components/AdminUsers';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';
import UserRecordsTable from '../components/UserRecordsTable';
import ShowRegisters from '../components/ShowRegisters';
import WhatSappDash from '../components/WhatSappDash';
export default function Dashboard() {
  // Definimos un estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Recuperamos los datos del usuario del almacenamiento local
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioGuardado) {
      // Si hay datos del usuario, actualizamos el estado
      setUsuario(usuarioGuardado);
    } else {
      // Si no hay datos del usuario, redirigimos al usuario al inicio de sesión
      window.location.href = '/';
    }
  }, []);
  
  // Estado para controlar qué componente se muestra en la parte central
  const [componenteCentral, setComponenteCentral] = useState(null);

  // Función para manejar la selección de opción desde el HeaderUser
  const handleSeleccionOpcion = (opcion) => {
    // Lógica para determinar qué componente mostrar en función de la opción seleccionada
    setComponenteCentral(null);
    switch (opcion) {
      case 'usuarios':
        setComponenteCentral(<AdminUsers />);
        break;
      case 'registros':
        setComponenteCentral(<ShowRegisters/>);
        break;
      case 'exportar':
        setComponenteCentral(<h1>En Desarrollo ff</h1>);
        break;  
      case 'registrar':
        setComponenteCentral(<h1>En Desarrollo fsd</h1>);
        break;
      case 'whatsapp':
        setComponenteCentral(<WhatSappDash />);
        break;
      default:
        setComponenteCentral(null); // Restablece el componente central a null si no se selecciona ninguna opción válida
    }
  };
  

  // Contenido del dashboard según el nivel del usuario
  let contenido;
  if (usuario) {
    switch (usuario.nivel) {
      case 3:
        contenido = <HeaderUser usuario={usuario} subMenu={<GodDashboard  onSeleccionOpcion={handleSeleccionOpcion}/>}/>;
        break;
      case 2:
        
        contenido = <HeaderUser usuario = {usuario} subMenu={<AdminDashboard onSeleccionOpcion={handleSeleccionOpcion}/>}/>

        break;
      case 1:
        contenido = <HeaderUser usuario = {usuario} subMenu={<UserDashboard onSeleccionOpcion={handleSeleccionOpcion}/>}/>
        break;
      default:
        contenido = <h2>No se ha definido un contenido para este nivel de usuario</h2>;
    }
  }

  return (
    <div className="dashboard-container">
      {/* Renderizamos el contenido según el nivel del usuario */}
      {contenido}

      {/* Renderizar el componente central */}
      <div className="central-component">
        {componenteCentral}
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 20px;
        }

        .central-component {
          margin-top: 20px;
        }

        @media (min-width: 768px) {
          .dashboard-container {
            max-width: 800px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
