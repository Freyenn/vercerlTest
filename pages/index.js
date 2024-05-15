import { useState, useEffect } from 'react';


export default function LoginPage() {
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      window.location.href = '/dashboard'; // Redirigir a la página del dashboard si hay datos de usuario en el localStorage
    }
  }, []); // El segundo argumento vacío indica que este efecto solo se ejecutará una vez, al montar el componente

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar si se ingresó un usuario
    if (!username) {
      setShowWarning(true);
      return;
    }
    // Validar que la contraseña tenga 4 números
    if (password.length !== 4 || isNaN(password)) {
      setShowWarning(true);
      return;
    }
    // Aquí puedes agregar la lógica para enviar los datos del formulario al backend para autenticar al usuario
    try {
      // Enviar los datos del formulario al endpoint /api/login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Si la respuesta es exitosa, obtenemos los datos del usuario de la respuesta
        const responseData = await response.json();
        const usuario = responseData.usuario;

        // Guardamos los datos del usuario en el almacenamiento local
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redirigimos al usuario a la página de dashboard
        window.location.href = '/dashboard';
      } else {
        // Si la respuesta no es exitosa, parseamos los datos como JSON
        const responseData = await response.json();
        console.warn('Error al iniciar sesión:', responseData.message);
        // Manejar el error o mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.warn('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {showWarning && <div className="warning">Por favor, ingresa un usuario y una contraseña válida de 4 números.</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de Usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña (4 números)"
          minLength={4}
          maxLength={4}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <footer className="footer">
        <p>Todos los derechos reservados © 2024</p>
      </footer>
    </div>
  );
}
