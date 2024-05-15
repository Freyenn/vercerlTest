import React, { useState } from 'react';

const MensajeMasivo = () => {
  const [mensaje, setMensaje] = useState('');

  const enviarMensaje = async () => {
    try {
      const response = await fetch('/api/masiveMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensaje: mensaje })
      });

      if (response.ok) {
        console.log('Mensaje enviado con éxito');
        alert("Mensajes enviado con éxito");
      } else {
        alert("Algo salio mal, no se enviaron los mensajes");
        console.error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return (
    <div>
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escriba su mensaje aquí"
        rows={5} // Puedes ajustar este valor según tus necesidades
        cols={50} // Puedes ajustar este valor según tus necesidades
      />
      <br />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
};

export default MensajeMasivo;
