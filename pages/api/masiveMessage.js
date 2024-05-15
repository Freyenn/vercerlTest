import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const { mensaje } = req.body;
        console.log(mensaje);
      // Obtener los datos de la base de datos
      const result = await sql`
        SELECT DISTINCT telefono
        FROM registros
      `;
      
      // Obtener los registros del resultado
      const registros = result.rows;


      // Formatear los datos para el envío al backend
      const data = registros.map(registro => ({
        telefono: registro.telefono
      }));

      // Realizar la solicitud al endpoint del backend para envío masivo
      const response = await fetch('http://localhost:4000/api/EnviarMensajesMasivos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensaje:mensaje, data:data })
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const responseData = await response.json();
        const message = responseData.message;
        res.status(200).json({ message: message });
      } else {
        throw new Error('Error en la solicitud al backend');
      }
    } catch (error) {
      console.error('Error al enviar mensajes masivos:', error);
      res.status(500).json({ message: 'Error al enviar mensajes masivos' });
    }
  } else {
    // Si no es una solicitud POST, devolvemos un error 405 (Método no permitido)
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido.`);
  }
}
