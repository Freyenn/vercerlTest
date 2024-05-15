import { useState } from 'react';

const Modal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    email: '',
    nivel: '',
    contraseña: ''
  });
  const [passwordError, setPasswordError] = useState(false);
  const [fieldError, setFieldError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validar la contraseña
    if (name === 'contraseña') {
      if (value.length !== 4 || isNaN(Number(value))) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los campos
    const fieldsValid = Object.values(formData).every(val => val !== '');
    if (!fieldsValid || passwordError) {
      setFieldError(true);
      return;
    }

    try {
      const response = await fetch('/api/AddNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onClose();
        // Aquí puedes mostrar un mensaje de éxito o realizar alguna otra acción
        alert('Usuario Agregado Exitosamente');
      } else {
        console.error('Error al agregar usuario');
        alert('Error al agregar usuario');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Agregar Nuevo Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="usuario">Usuario:</label>
            <input type="text" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="nivel">Nivel:</label>
            <select id="nivel" name="nivel" value={formData.nivel} onChange={handleChange}>
              <option value="">Seleccionar nivel</option>
              <option value="1">Usuario</option>
              <option value="2">Administrador</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña:</label>
            <input type="password" id="contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} />
            {passwordError && <p className="error">La contraseña debe tener exactamente 4 números.</p>}
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

export default Modal;
