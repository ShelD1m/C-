import React from "react";
import "../../styles/ui/InputField.css";

export default function InputField({ 
    placeholder, 
    variant = "gray", 
    value, 
    onChange,
    type = "text"
}) {
    const className = `input-field ${variant}`;

    return (
        <input
            type={type}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}