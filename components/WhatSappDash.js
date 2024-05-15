import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import MensajeMasivo from './MensajeMasivo'
let check = true;

const WhatSappDash = () => {
  //localStorage.setItem('isLoggedIn', 'false');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' || false);
  const [qrText, setQrText] = useState();
  const [whatsappState, setWhatsappState] = useState(localStorage.getItem('whatsappState') || '');
  //const [check, setcheck] = useState(true);
  
  
  const handleLogin = async () => {
    try {
      check = true;
      console.log("check 1",check)
      const response = await fetch('http://62.72.7.33:3000/api/generateQRCode');
      
      const data = await response.json();
      check = false;
      console.log("check 2",check)
      setQrText(data.qr);
      setWhatsappState(data.state);
      // Guardar el código QR en localStorage
      localStorage.setItem('qrText', data.qr);
      if (data.state === "READY") {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('whatsappState', data.state);
      } else {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('whatsappState', data.state);
      }
    } catch (error) {
      console.error('Error al obtener el código QR:', error);
    }
  };

  const handleQR = async () => {
    try {
      const response = await fetch('http://62.72.7.33:4000/api/generateQRCode');
      const data = await response.json();
      setQrText(data.qr);
      // Guardar el código QR en localStorage
      localStorage.setItem('qrText', data.qr);
      if (data.state === "READY") {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('whatsappState', 'READY');
        localStorage.setItem('qrText','');
      }
      
    } catch (error) {
      console.error('Error al obtener el código QR:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://62.72.7.33:4000/api/logoutWhats');
      const data = await response.json();
      setWhatsappState(data.state);
      setQrText('');
      localStorage.setItem('qrText','');
      if (data.state !== "READY") {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.setItem('whatsappState', data.state);
      }
    } catch (error) {
      console.error('Error al cerrar la sesión de WhatsApp:', error);
    }
  };

  // Función para actualizar el código QR periódicamente
  const updateQRCode = () => {
    console.log("updateQRCode dd:d:d")
    console.log("check3",check)
    if (!check) {
      console.log("updateQR dd:d:d")
      handleQR();
    }
  };



  // Iniciar el temporizador para actualizar el código QR cada 30 segundos
  useEffect(() => {
    handleLogin();
    setQrText(localStorage.getItem('qrText'));
    //setIsLoggedIn(false);
    return () => {
    } // Limpiar el temporizador al desmontar el componente
  }, []); // Ejecutar solo cuando isLoggedIn cambia

 // Iniciar el temporizador para actualizar el código QR cada 30 segundos

  return (
    <div className="whatsapp-dash">
      {!isLoggedIn ? (
        <div>
          {qrText !== '' && <QRCode value={qrText} />}
          {qrText == '' ? (
          <div>
            <h1>Cargando ...</h1>
            <button onClick={handleLogin}>Iniciar Sesion</button>
            </div>
        )
          :<button onClick={handleQR}>Nuevo Qr</button>}
          
        </div>
      ) : (
        <div>
          <p>¡Has iniciado sesión en WhatsApp!</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>

          <MensajeMasivo/>
        </div>
      )}
      {whatsappState && <h1>{whatsappState}</h1>}

      <style jsx>{`
        .whatsapp-dash {
          text-align: center;
          margin-top: 20px;
        }

        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 10px;
        }

        button:hover {
          background-color: #0056b3;
        }

        p {
          font-size: 18px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default WhatSappDash;
