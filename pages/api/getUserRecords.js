import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Obtener los parámetros de la solicitud
      var { userId, page, perPage, sort } = req.query;
      console.log("userId",userId);
      console.log("page",page);
      console.log("perPage",perPage);
      var sorted = (sort === 'desc' ? "DESC" : "ASC");
      console.log("sort",sort);
      console.log("sorted",sorted);

      // Calcular el offset para la paginación
      var offset = (parseInt(page) - 1) * parseInt(perPage);
      
      // Realizar la consulta para obtener los registros del usuario con paginación y ordenamiento
      if(userId!=='all'){
        if(sort === 'desc'){
          const { rows } = await sql`
          SELECT * FROM registros
          WHERE usuario_id = ${userId}
          ORDER BY id ASC
          LIMIT ${perPage} OFFSET ${offset}
        `;
        // Enviar los registros obtenidos como respuesta
        res.status(200).json(rows);
        } else {
          const { rows } = await sql`
          SELECT * FROM registros
          WHERE usuario_id = ${userId}
          ORDER BY id DESC
          LIMIT ${perPage} OFFSET ${offset}
        `;
        // Enviar los registros obtenidos como respuesta
        res.status(200).json(rows);
        }
      } else {
        if(sort === 'desc'){
          const { rows } = await sql`
          SELECT * FROM registros
          ORDER BY id ASC
          LIMIT ${perPage} OFFSET ${offset}
        `;
        // Enviar los registros obtenidos como respuesta
        res.status(200).json(rows);
        } else {
          const { rows } = await sql`
          SELECT * FROM registros
          ORDER BY id DESC
          LIMIT ${perPage} OFFSET ${offset}
        `;
        // Enviar los registros obtenidos como respuesta
        res.status(200).json(rows);
        }
      }
        
      

      
    } catch (error) {
      console.error('Error al obtener registros de usuario:', error);
      res.status(500).json({ message: 'Error al obtener registros de usuario' });
    }
  } else {
    // Si no es una solicitud GET, devolvemos un error 405 (Método no permitido)
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido.`);
  }
}
