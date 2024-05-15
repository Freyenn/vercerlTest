import { useState } from 'react';
import ModalNewRegister from './ModalNewRegister';

const BtnNewRegister = ({ onClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (formData) => {
    // Aquí puedes hacer la llamada al endpoint para agregar el nuevo usuario
    // y mostrar la respuesta en una ventana emergente
    console.log(formData);
    // Lógica para llamar al endpoint AddNewUser.js y mostrar la respuesta
    // en una ventana emergente
    alert('Usuario agregado exitosamente');
    handleCloseModal();
  };

  return (
    <>
      <button onClick={handleOpenModal} className="boton-agregar">
        Nuevo Registro
      </button>
      {showModal && <ModalNewRegister onClose={handleCloseModal} onSubmit={handleFormSubmit} />}
      <style jsx>{`
        /* Estilos del botón */
        
        .boton-agregar {
          padding: 10px 20px;
          background-color: #0070f3; /* Morado pastel */
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-size: calc(5px + 0.5vw);
          margin-left: auto; /* Alinea el botón a la derecha */
        }
        
        .boton-agregar:hover {
          background-color: #6c41e5; /* Morado pastel más oscuro al pasar el mouse */
        }


      `}</style>
    </>
  );
};

export default BtnNewRegister;
