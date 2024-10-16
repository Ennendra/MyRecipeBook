import React from 'react';
import './ConfirmLeaveModal.css';

export const ConfirmLeaveModal = ({ isOpen, onClose, onLeave }) => {
  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>
          Are you sure you want to leave this page? Any unsaved data will not be stored, and you may
          lose your progress. Please confirm if you wish to continue.
        </p>
        <div className="button-container">
          <button onClick={onLeave} className="leave-button">
            Leave
          </button>
          <button onClick={onClose} className="stay-button">
            Stay
          </button>
        </div>
      </div>
    </div>
  );
};
