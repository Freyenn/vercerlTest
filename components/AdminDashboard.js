import React, { useState } from 'react';
import BtnAddUser from './BtnAddUser';

const AdminDashboard = ({ onSeleccionOpcion }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSeleccionOpcion(option);
  };

  return (
    <>
      <div className="container">
        <div className="buttonContainer">
          <button
            className="button"
            style={{
              backgroundColor: selectedOption === 'usuarios' ? '#005bac' : '#0070f3',
            }}
            onClick={() => handleOptionClick('usuarios')}
          >
            Administrar Usuarios
          </button>
          <BtnAddUser />
          <button
            className="button"
            style={{
              backgroundColor: selectedOption === 'registros' ? '#005bac' : '#0070f3',
            }}
            onClick={() => handleOptionClick('registros')}
          >
            Ver Registros
          </button>
          <button
            className="button"
            style={{
              backgroundColor: selectedOption === 'exportar' ? '#005bac' : '#0070f3',
            }}
            onClick={() => handleOptionClick('exportar')}
          >
            Exportar
          </button>
          <button
            className="button"
            style={{
              backgroundColor: selectedOption === 'whatsapp' ? '#005bac' : '#0070f3',
            }}
            onClick={() => handleOptionClick('whatsapp')}
          >
            whatsapp
          </button>
        </div>
      </div>

      <style jsx>{`
        .container {
          
          
        }
        
        .title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 20px;
          color: #333;
        }
        
        .buttonContainer {
          display: flex;
          flex-direction: space-between;
          align-items: center;
        }
        
        .button {
          padding: 10px 20px;
          margin: 5px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;

          font-size: calc(5px + 0.5vw);
        }
        
        .button:hover {
          background-color: #005bac;
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;
