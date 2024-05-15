import BtnDeleteUser from './BtnDeleteUser';
import BtnEditUser from './BtnEditUser';
import { useState } from 'react';

const UserTable = ({ usuarios, onEditarUsuario, onEliminarUsuario }) => {

  return (
    <div className="container">
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Nivel</th>
            <th>Acciones</th> {/* Columna adicional para los botones de editar y eliminar */}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.email}</td>
              <td>{usuario.nivel}</td>
              <td className="acciones">
                {/* Botón de editar */}
                <BtnEditUser onClick={() => onEditarUsuario(usuario.id)} usuario={usuario}/>
                {/* Botón de eliminar */}
                <BtnDeleteUser onClick={() => onEliminarUsuario(usuario.id)}/>
              </td>
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

        .usuarios-table {
          width: 100%;
          border-collapse: collapse;
        }

        .usuarios-table th,
        .usuarios-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        .usuarios-table th {
          background-color: #f2f2f2;
        }
        /* Estilo para los botones de editar y eliminar */
        .acciones {
          display: flex;
          flex-direction: column; /* Móvil: Botones apilados verticalmente */
        }

        .acciones button {
          margin-bottom: 5px; /* Espacio entre los botones */
        }

        @media (min-width: 768px) {
          .container {
            font-size: 16px; /* Aumentar el tamaño de fuente para pantallas más grandes */
          }

          .acciones {
            flex-direction: row; /* Pantallas más grandes: Botones en línea */
          }

          .acciones button {
            margin-bottom: 0; /* Restablecer el margen en pantallas más grandes */
            margin-right: 5px; /* Espacio entre los botones en línea */
          }
        }
      `}</style>
    </div>
  );
};

export default UserTable;
