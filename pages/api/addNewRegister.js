import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Obtener los datos del formulario para agregar un nuevo registro
    const { nombre, telefono, email, direccion, red_social, usuario_id, seccional} = req.body;

    // Realizar la lógica para agregar el nuevo registro a la base de datos
    try {
      // Ejemplo de inserción en la tabla "registros" utilizando la función sql
      const result = await sql`INSERT INTO registros (nombre, telefono, email, direccion, red_social, usuario_id, seccional) VALUES (${nombre}, ${telefono}, ${email}, ${direccion}, ${red_social}, ${usuario_id}, ${seccional})`;
      const response = await fetch(`http://localhost:4000/api/EnviarMensaje?nombre=${nombre}&telefono=${telefono}`);
      const data = await response.json();
      const message = data.message;
      res.status(200).json({ message: message});
    } catch (error) {
      // Si ocurre un error durante la inserción, enviar un mensaje de error
      console.log('Error al agregar registro:', error);
      res.status(500).json({ message: 'Error al agregar registro' });
    }
  } else {
    // Si no es una solicitud POST, devolvemos un error 405 (Método no permitido)
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido.`);
  }
}
