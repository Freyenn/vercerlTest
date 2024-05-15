import React from 'react';

const ModalGen = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
        </div>
        <div className="modal-actions">
          
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1001; /* Z-index alto para mostrar sobre todo lo demás */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background-color: white;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        .modal-content {
          margin-bottom: 20px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
        }

        button {
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ModalGen;