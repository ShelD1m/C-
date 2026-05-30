import React from "react";
import '../../styles/ui/TextButtonWithIcon.css'

export default function TextButtonWithIcon({
    text, 
    icon, 
    iconSide = "right", 
    onClick,
    color = "tan",
    bordered = false
}) {
    const className = `text-button ${iconSide} ${color} ${bordered ? 'bordered' : ''}`;

    return (
        <button className={className} type="button" onClick={onClick}>
            {text}
            <img src={icon} alt="dropdown" className="icon"/>
        </button>
    );
}