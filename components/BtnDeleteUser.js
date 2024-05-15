const BtnDeleteUser = ({ onClick }) => {

  

    return (
      <>
        <button onClick={onClick} className="boton-eliminar">
          {/* Icono de bote de basura */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff4d4d" /* Rojo pastel */
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-trash-2"
          >
            <path d="M3 6l2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"></path>
            <line x1="9" y1="14" x2="15" y2="14"></line>
          </svg>
        </button>
  
        <style jsx>{`
          .boton-eliminar {
            padding: 6px 10px;
            background-color: #ffd6d6; /* Rojo pastel */
            border: none;
            cursor: pointer;
            transition: transform 0.3s;
            border-radius: 5px;
          }
  
          .boton-eliminar:hover {
            transform: scale(1.1);
          }
  
          .feather {
            vertical-align: middle;
          }
        `}</style>
      </>
    );
  };
  
  export default BtnDeleteUser;
  