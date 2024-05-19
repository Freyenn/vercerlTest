import { sql } from '@vercel/postgres';

// Endpoint para obtener usuarios con paginación
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Obtener los parámetros de paginación de la consulta
      const { page = 1, perPage = 10, userId } = req.query;

      // Calcular el índice de inicio para la consulta
      const offset = (page - 1) * perPage;
      let rows;

      // Realizar la consulta para obtener usuarios paginados
      if(userId !== 'all'){
        rows = await sql`
        SELECT * FROM usuarios
        ORDER BY id
        LIMIT ${perPage}
        OFFSET ${offset}
      `;
      // Devolver los usuarios como respuesta
      res.status(200).json(rows.rows);
      } else {
        rows = await sql`
        SELECT * FROM usuarios
        ORDER BY id
      `;
      // Devolver los usuarios como respuesta
      res.status(200).json(rows.rows);
      }
      

      
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
