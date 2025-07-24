import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onRequestClose, prize }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onRequestClose} className="close-button">&times;</button>
        <div className="prize-announcement">You Won!</div>
        <div className="prize-value">{prize}</div>
      </div>
    </div>
  );
};

export default Modal;
