import { useState } from 'react';

const ModalEditarUsuario = ({ usuario, onClose}) => {
  const [formData, setFormData] = useState({
    nombre: usuario.nombre,
    usuarion: usuario.usuario,
    email: usuario.email,
    nivel: usuario.nivel,
    pass: usuario.pass
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar que todos los campos estén llenos
    const { nombre, usuarion, email, nivel, pass } = formData;
    if (!nombre || !usuarion || !email || !nivel || !pass) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    // Validar que la contraseña tenga exactamente 4 dígitos
    const passPattern = /^\d{4}$/;
    if (!passPattern.test(pass)) {
      alert('La contraseña debe tener exactamente 4 números');
      return;
    }
  
    try {
      // Realizar la solicitud PUT al endpoint encargado de editar el usuario
      const response = await fetch(`/api/editUser?id=${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        // Si la solicitud es exitosa, cierra el modal
        onClose();
        // Aquí puedes mostrar un mensaje de éxito o realizar alguna otra acción
      } else {
        // Si la solicitud falla, muestra un mensaje de error o realiza alguna otra acción
        console.error('Error al editar usuario');
        alert('Error al editar usuario');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="usuario">Usuario:</label>
            <input type="text" id="usuarion" name="usuarion" value={formData.usuarion} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="nivel">Nivel:</label>
            <select id="nivel" name="nivel" value={formData.nivel} onChange={handleChange}>
              <option value="1">Usuario</option>
              <option value="2">Administrador</option>
              <option value="3">GOD</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pass">Contraseña:</label>
            <input type="password" id="pass" name="pass" value={formData.pass} onChange={handleChange} />
          </div>
          <div className="button-group">
            <button type="submit">Aceptar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
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
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }

        /* Estilos del formulario */
        .form-group {
          margin-bottom: 15px;
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
          justify-content: flex-end; /* Alinear los botones al final */
          margin-top: 20px; /* Espacio entre el formulario y los botones */
        }

        .button-group button {
          margin-left: 10px; /* Espacio entre los botones */
        }
         /* Estilos adicionales para el mensaje de error */
         .error {
          color: red;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
};

export default ModalEditarUsuario;
