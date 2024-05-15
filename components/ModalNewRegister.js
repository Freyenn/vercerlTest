import { useState, useEffect } from 'react';
import ModalGen from './ModalGen';

const ModalNewRegister = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    red_social: '',
    seccional: ''
  });
  const [fieldError, setFieldError] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null); // Estado para almacenar el usuario_id
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    // Obtener el usuario_id del localStorage al cargar el componente
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);
      if (usuario && usuario.id) {
        setUsuarioId(usuario.id);
      }
    }
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los campos
    const fieldsValid = Object.values(formData).every(val => val !== '');
    if (!fieldsValid) {
      setFieldError(true);
      return;
    }

    try {
      handleOpenModal();
      const response = await fetch('/api/addNewRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          usuario_id: usuarioId // Agregar el usuario_id al objeto formData
        })
      });
      handleCloseModal();
      if (response.ok) {
        
        onClose();
        // Aquí puedes mostrar un mensaje de éxito o realizar alguna otra acción
        alert('Registro agregado exitosamente');
        //onSubmit();
      } else {
        console.error('Error al agregar registro');
        alert('Error al agregar registro');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };
  

  return (
    
    <div className="modal-overlay">
      {showModal && <ModalGen message={"Registrando Usuario"} onClose={handleCloseModal}/>}
      <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Agregar Nuevo Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección:</label>
            <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
            <label htmlFor="seccional">Seccional:</label>
            <input type="text" id="seccional" name="seccional" value={formData.seccional} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="redSocial">Red Social:</label>
            <input type="text" id="red_social" name="red_social" value={formData.red_social} onChange={handleChange} />
          </div>
          <div className="button-group">
            <button type="submit">Aceptar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
          {fieldError && <p className="error">Por favor completa todos los campos correctamente.</p>}
        </form>
      </div>
    



      <style jsx>{`
  /* Estilos del modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000; /* Z-index alto para mostrar sobre todo lo demás */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 90%; /* Ancho del modal */
    max-width: 400px; /* Ancho máximo del modal */
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  /* Estilos del formulario */
  .form-group {
    margin-bottom: 10px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .button-group {
    display: flex;
    justify-content: space-between; /* Alinear los botones al final */
    margin-top: 20px; /* Espacio entre el formulario y los botones */
  }

  .button-group button {
    flex: 1; /* Distribuir el espacio entre los botones */
    margin-left: 5px; /* Espacio entre los botones */
  }

  /* Estilos adicionales para el mensaje de error */
  .error {
    color: red;
    margin-top: 5px;
  }

  @media (min-width: 768px) {
    /* Estilos adicionales para pantallas más grandes */
    .modal {
      padding: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .button-group {
      margin-top: 30px; /* Espacio entre el formulario y los botones */
    }
  }
`}</style>

    </div>
  );
};

export default ModalNewRegister;
