import React, { useState } from 'react';
import HintModal from './HintModal.jsx';
import HintIcon from '../../assets/ic-hint-lamp.svg';

export default function SectionHeader({ iconSrc, title, hints = [] }) {
  const [showHint, setShowHint] = useState(false);
  const toggleHint = () => setShowHint((prev) => !prev);

  return (
    <div className="section-header">
    <div className="header-with-icon">
      {iconSrc && <img src={iconSrc} alt={`${title} icon`} className="section-icon" />}
      <h2>{title}</h2>
      </div>
      {hints.length > 0 && (
        <>
          <button className="hint-button" onClick={toggleHint}>
            <img src={HintIcon} alt="Советы" />
          </button>
          <HintModal showHint={showHint} hints={hints} onClose={toggleHint} />
        </>
      )}
    </div>
  );
}