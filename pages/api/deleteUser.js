import { sql } from '@vercel/postgres';

// Endpoint para eliminar un usuario por su ID
export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      // Obtener el ID del usuario a eliminar desde los parámetros de la solicitud
      const { id } = req.query;
      console.log("Id:",id.type)  
      // Realizar la consulta para eliminar el usuario de la base de datos
      const result = await sql`DELETE FROM usuarios WHERE id = ${id}`;

      // Si la eliminación es exitosa, enviar una respuesta con estado 200 (OK)
      res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente` });
    } catch (error) {
      // Si hay un error durante la eliminación, enviar una respuesta con estado 500 (Error interno del servidor)
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ message: 'Error al eliminar usuario' });
    }
  } else {
    // Si no es una solicitud DELETE, devolver un error 405 (Método no permitido)
    res.status(405).json({ message: 'Método no permitido' });
  }
}
