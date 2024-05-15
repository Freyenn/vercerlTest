import { sql } from "@vercel/postgres";
  
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Obtener los datos del formulario de inicio de sesión
    const { username, password } = req.body;
    
    // Realizar la consulta para obtener el usuario con el nombre de usuario proporcionado
    const { rows } = await sql`SELECT * FROM usuarios WHERE usuario = ${username}`;
    
    // Verificar si se encontró algún usuario con ese nombre de usuario
    if (rows.length === 0) {
      // Si no se encontró ningún usuario, enviar un mensaje de error
      res.status(401).json({ message: 'Nombre de usuario incorrecto.' });
      return;
    }
    
    // Obtener el primer usuario encontrado (debería haber solo uno)
    const usuario = rows[0];
    

    // Verificar si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
    if (usuario.pass.toString() !== password) {
      // Si la contraseña no coincide, enviar un mensaje de error
      res.status(401).json({ message: 'Contraseña incorrecta.' });
      return;
    }

    // Si la validación fue exitosa, enviar un mensaje de éxito
    res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: usuario });
  } else {
    // Si no es una solicitud POST, devolvemos un error 405 (Método no permitido)
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido.`);
  }
}