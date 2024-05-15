import { useEffect, useState } from 'react';
import BtnAddUser from './BtnAddUser';
import UserTable from './UserTable';

const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsuarios();
  }, [currentPage]);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const totalUsersResponse = await fetch('/api/getTotalUsers');
        const totalUsers = await totalUsersResponse.json();
        const totalPagesCount = Math.ceil(totalUsers / usersPerPage);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error('Error al obtener el total de usuarios:', error);
      }
    };

    fetchTotalUsers(); // Solo se ejecuta una vez al montar el componente
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`/api/getUsers?page=${currentPage}&perPage=${usersPerPage}`);
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleAgregarUsuario = () => {
    console.log('Agregar usuario');
  };

  const handleEditarUsuario = (id) => {
    // Lógica para editar usuario
    console.log('Editar usuario con ID:', id);
  };

  const handleEliminarUsuario = async (id) => {
    try {
      // Realizar la solicitud DELETE al endpoint encargado de eliminar el usuario
      const response = await fetch(`/api/deleteUser?id=${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Si la solicitud es exitosa, elimina el usuario de la lista local
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        console.log(`Usuario con ID ${id} eliminado correctamente`);
        alert(`Usuario con ID ${id} eliminado correctamente`);
      } else {
        // Si la solicitud falla, muestra un mensaje de error o realiza alguna otra acción
        console.error('Error al eliminar usuario');
        alert('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };
  
  

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      <div className="containerAddUser">
        <h1>Lista de Usuarios</h1>
        {/* <BtnAddUser onClick={handleAgregarUsuario} /> */}
      </div>
      <UserTable
        usuarios={usuarios}
        onEditarUsuario={handleEditarUsuario}
        onEliminarUsuario={handleEliminarUsuario}
      />
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
      <style jsx>{`
        .container {
          max-width: 100%;
          padding: 20px;
        }

        .containerAddUser {
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .containerAddUser > h1 {
          margin: 0;
          font-size: 20px;
          flex-grow: 1;
        }

        .pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 0 5px;
  padding: 8px 16px;
  border: 1px solid #0070f3; /* Color del borde */
  border-radius: 4px;
  background-color: #0070f3; /* Color de fondo */
  color: #fff; /* Color del texto */
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

      `}</style>
    </div>
  );
};

export default AdminUsers;
