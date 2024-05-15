import React from 'react';

// Función para manejar el logout
const handleLogout = async ()  => {
  // Limpiamos los datos del usuario del almacenamiento local
  localStorage.removeItem('usuario');
  // Redirigimos al usuario al inicio de sesión
  window.location.href = '/';

};

const HeaderUser = ({ usuario, subMenu}) => {
  
  return (
    <>
      <header>
        <div className='topHeader'>
          {usuario && <h1>Bienvenido, {usuario.nombre}</h1>}
          {/* Botón para hacer logout */}
          <div>
          <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
        {subMenu && (
        <div>
          {subMenu}
        </div>
      )}
      </header>
      
      

      <style jsx>{`
        header {
          width: 100%;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          
        }
        .topHeader{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        header h1 {
          margin-bottom: 10px;
          text-align: center;
          font-size: calc(8px + 1vw);
        }

        header button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-size: calc(5px + 0.5vw);
        }

        header button:hover {
          background-color: #005bac;
        }
      `}</style>
    </>
  );
};

export default HeaderUser;
