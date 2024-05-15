import React, { useState } from 'react';
import ModalEditarUsuario from './ModalEditarUsuario';

const BtnEditUser = ({ onClick, usuario }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    onClick();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

    return (
      <>
        <button onClick={handleOpenModal} className="boton-editar">
          {/* Icono de edición */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4caf50" /* Verde pastel */
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-edit"
          >
            <path d="M19 6.25l-1.27-1.27c-0.19-0.18-0.44-0.27-0.7-0.27s-0.51 0.09-0.7 0.27l-0.71 0.71-2.83 2.83 4.24 4.24 2.83-2.83 0.71-0.71c0.37-0.36 0.37-0.93 0-1.28zM3.83 17.46l6.34-6.34-1.83-1.83-6.34 6.34v1.83h1.83zM14.17 8.54l-8.35 8.35h-2.17v-2.17l8.35-8.35 2.17 2.17z"></path>
          </svg>
        </button>
        {showModal && (
        <ModalEditarUsuario
          usuario={usuario}
          onClose={handleCloseModal}
        />
      )}
  
        <style jsx>{`
          .boton-editar {
            padding: 6px 10px;
            background-color: #d0f8ce; /* Verde pastel */
            border: none;
            cursor: pointer;
            transition: transform 0.3s;
            border-radius: 5px;
          }
  
          .boton-editar:hover {
            transform: scale(1.1);
          }
  
          .feather {
            vertical-align: middle;
          }
        `}</style>
      </>
    );
  };
  
  export default BtnEditUser;
  