import React from "react";
import "../../styles/ui/SecondaryButton.css";

export default function SecondaryButton({ text, onClick, variant = "tan" }) {
    const className = `secondary-button sec-btn-${variant}`;

    return (
        <button className={className} type="button" onClick={onClick}>
            {text}
        </button>
    );
}
