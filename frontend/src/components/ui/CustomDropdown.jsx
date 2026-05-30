import React, { useState, useEffect } from "react";
import "../../styles/ui/DropDown.css";
import OptionButton from "./OptionButton.jsx";

export default function CustomDropdown({ placeholder, options, initialValue, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(initialValue || "");

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };

    return (
        <div className="dropdown">
            <OptionButton
                text={selectedOption || (placeholder || "Выберите...")}
                onClick={toggleDropdown}
            />
            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option) => (
                        <li
                            key={option}
                            className={option === selectedOption ? "selected" : ""}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}