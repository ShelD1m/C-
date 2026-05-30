import React from 'react';
import DropdownArrowIcon from '../../assets/ic-dropdown-arrow.svg';
import '../../styles/ui/OptionButtonReversed.css';

export default function OptionButtonReversed({ text, onClick, isOpen }) {
  return (
    <button className="option-button-reversed" type="button" onClick={onClick}>
      <img
        src={DropdownArrowIcon}
        alt="dropdown"
        className={`dropdown-icon ${isOpen ? 'rotated' : ''}`} 
      />
      <span>{text}</span>
    </button>
  );
}