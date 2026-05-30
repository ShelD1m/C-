import React from 'react';
import '../../styles/ui/HintModal.css';


const HintModal = ({ showHint, hints, onClose }) => {
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('hint-modal')) {
      onClose();
    }
  };

  return (
    showHint && (
      <div className="hint-modal" onClick={handleBackgroundClick}>
        <div className="hint-content">
          <div className="hint-inner-content">
            <h3>Советы</h3>
            <ol>
              {hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  );
};

export default HintModal;