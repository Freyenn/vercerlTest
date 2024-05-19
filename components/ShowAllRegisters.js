import { useState, useEffect } from 'react';

const ShowAllRegisters = () => {
  const [userRecords, setUserRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUserRecords();
  }, [currentPage, recordsPerPage, sortOrder, selectedUser]);

  useEffect(() => {
    fetchTotalRecords();
  }, [recordsPerPage, selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/getUsers?&userId=all');
      const data = await response.json();
      //console.log("DATA:", data)
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const fetchTotalRecords = async () => {
    try {
      const userIdQuery = selectedUser === 'all' ? '&userId=all' : `&userId=${selectedUser}`;
      const response = await fetch(`/api/getTotalRecords?${userIdQuery}`);
      const { totalRecordsCount } = await response.json();
      const totalPagesCount = Math.ceil(totalRecordsCount / recordsPerPage);
      setTotalPages(totalPagesCount);
    } catch (error) {
      console.error('Error al obtener el total de registros:', error);
    }
  };

  const fetchUserRecords = async () => {
    try {
      const userIdQuery = selectedUser === 'all' ? '&userId=all' : `&userId=${selectedUser}`;
      const response = await fetch(`/api/getUserRecords?page=${currentPage}&perPage=${recordsPerPage}&sort=${sortOrder}${userIdQuery}`);
      const data = await response.json();
      setUserRecords(data);
    } catch (error) {
      console.error('Error al obtener registros de usuario:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    fetchUserRecords();
  };

  return (
    <div className="container">
      <div className="pagination">
        <select value={recordsPerPage} onChange={handleRecordsPerPageChange}>
          <option value="10">10 registros por página</option>
          <option value="20">20 registros por página</option>
          <option value="30">30 registros por página</option>
        </select>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">ID ascendente</option>
          <option value="desc">ID descendente</option>
        </select>
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="all">Todos los usuarios</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.nombre}</option>
          ))}
        </select>
        <button onClick={handleRefresh} className="refresh-button">Actualizar</button>
      </div>
      <table className="user-records-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Red Social</th>
          </tr>
        </thead>
        <tbody>
          {userRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.nombre}</td>
              <td>{record.telefono}</td>
              <td>{record.email}</td>
              <td>{record.direccion}</td>
              <td>{record.red_social}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
      <style jsx>{`
        .container {
          max-width: 100%;
          padding: 20px;
        }

        .pagination {
          margin-top: 20px;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }

        .pagination select, .pagination button {
          margin: 0 5px;
          padding: 8px 16px;
          border: 1px solid #0070f3;
          border-radius: 4px;
          background-color: #0070f3;
          color: #fff;
          cursor: pointer;
        }

        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .refresh-button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: #0070f3;
        }

        .user-records-table {
          width: 100%;
          border: 1px solid #ddd;
          border-collapse: collapse;
        }

        .user-records-table th,
        .user-records-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        .user-records-table th {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
};

export default ShowAllRegisters;
