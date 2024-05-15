import { useState } from 'react';

const UserRecordsTable = ({ userRecords }) => {

  return (
    <div className="container">
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
              <td>{record.redSocial}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          max-width: 100%;
          padding: 20px;
          font-size: 14px; /* Tamaño de fuente base */
        }

        .user-records-table {
          width: 100%;
          border: 1px solid #ddd; /* Borde exterior de la tabla */
          border-collapse: collapse;
        }

        .user-records-table th,
        .user-records-table td {
          border: 1px solid #ddd; /* Borde interior de las celdas */
          padding: 8px;
          text-align: left;
        }

        .user-records-table th {
          background-color: #f2f2f2;
        }

        @media (min-width: 768px) {
          .container {
            font-size: 16px; /* Aumentar el tamaño de fuente para pantallas más grandes */
          }
        }
      `}</style>
    </div>
  );
};

export default UserRecordsTable;
