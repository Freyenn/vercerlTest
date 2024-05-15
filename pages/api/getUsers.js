import { sql } from '@vercel/postgres';

// Endpoint para obtener usuarios con paginación
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Obtener los parámetros de paginación de la consulta
      const { page = 1, perPage = 10 } = req.query;

      // Calcular el índice de inicio para la consulta
      const offset = (page - 1) * perPage;

      // Realizar la consulta para obtener usuarios paginados
      const { rows } = await sql`
        SELECT * FROM usuarios
        ORDER BY id
        LIMIT ${perPage}
        OFFSET ${offset}
      `;

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
