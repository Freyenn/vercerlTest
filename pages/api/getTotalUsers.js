import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Realizar la consulta para obtener el total de usuarios
      const result = await sql`SELECT COUNT(*) AS total FROM usuarios`;
      const totalUsers = result.rows[0].total;

      // Devolver el total de usuarios como respuesta
      res.status(200).json(totalUsers);
    } catch (error) {
      console.error('Error al obtener el total de usuarios:', error);
      res.status(500).json({ message: 'Error al obtener el total de usuarios' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}