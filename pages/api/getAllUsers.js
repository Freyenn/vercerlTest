
import { sql } from '@vercel/postgres';

// Endpoint para obtener todos los usuarios
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Realizar la consulta para obtener todos los usuarios
        const { rows } = await sql`SELECT * FROM usuarios `;

      // Devolver los usuarios como respuesta
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
