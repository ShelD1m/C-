import React from 'react';
import DropdownArrowIcon from '../../assets/ic-dropdown-arrow.svg'
import '../../styles/ui/OptionButton.css'

export default function OptionButton( {text, onClick } ) {
    return (
        <button className="option-button" type="button" onClick={onClick}>
            {text}
            <img src={DropdownArrowIcon} alt="dropdown" />
        </button>
    )
}