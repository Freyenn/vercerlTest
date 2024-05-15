import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Obtener los datos del formulario para agregar un nuevo usuario
    const { nombre, usuario, email, nivel, contraseña } = req.body;

    // Realizar la lógica para agregar el nuevo usuario a la base de datos
    try {
      // Ejemplo de inserción en una tabla "usuarios" utilizando la función sql
      const result = await sql`INSERT INTO usuarios (nombre, usuario, email, pass, nivel) VALUES (${nombre}, ${usuario}, ${email}, ${contraseña}, ${nivel})`;

      // Enviar una respuesta de éxito si la inserción fue exitosa
      res.status(200).json({ message: 'Usuario agregado exitosamente' });
    } catch (error) {
      // Si ocurre un error durante la inserción, enviar un mensaje de error
      console.log('Error al agregar usuario:');
      res.status(500).json({ message: 'Error al agregar usuario' });
    }
  } else {
    // Si no es una solicitud POST, devolvemos un error 405 (Método no permitido)
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido.`);
  }
}
