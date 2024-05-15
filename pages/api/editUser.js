import { sql } from '@vercel/postgres';

// Endpoint para editar un usuario por su ID
export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      // Obtener el ID del usuario a editar desde los parámetros de la solicitud
      const { id } = req.query;
      
      // Obtener los datos del usuario a partir del cuerpo de la solicitud
      const { nombre, usuarion, email, nivel, pass } = req.body;

      // Realizar la consulta para editar el usuario en la base de datos
      const result = await sql`
        UPDATE usuarios 
        SET nombre = ${nombre}, usuario = ${usuarion}, email = ${email}, nivel = ${nivel}, pass = ${pass}
        WHERE id = ${id}
      `;

      // Si la edición es exitosa, enviar una respuesta con estado 200 (OK)
      res.status(200).json({ message: `Usuario con ID ${id} editado correctamente` });
    } catch (error) {
      // Si hay un error durante la edición, enviar una respuesta con estado 500 (Error interno del servidor)
      console.error('Error al editar usuario:', error);
      res.status(500).json({ message: 'Error al editar usuario' });
    }
  } else {
    // Si no es una solicitud PUT, devolver un error 405 (Método no permitido)
    res.status(405).json({ message: 'Método no permitido' });
  }
}
