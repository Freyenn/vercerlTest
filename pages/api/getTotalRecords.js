import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Obtener el ID de usuario de la solicitud
      const { userId } = req.query;

      // Realizar la consulta para obtener la cantidad total de registros del usuario
      const result = await sql`SELECT COUNT(*) FROM registros WHERE usuario_id = ${userId}`;

      // Extraer el conteo de la consulta
      const totalRecordsCount = result.rows[0].count;

      // Enviar el conteo total de registros como respuesta
      res.status(200).json({ totalRecordsCount });
      console.log("totalRecordsCount",totalRecordsCount);
    } catch (error) {
      console.error('Error al obtener el total de registros:', error);
      res.status(500).json({ message: 'Error al obtener el total de registros' });
    }
  } else {
    // Si no es una solicitud GET, devolvemos un error 405 (Método no permitido)
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido.`);
  }
}
