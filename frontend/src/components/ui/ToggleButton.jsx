import React from "react";
import "../../styles/ui/ToggleButton.css";

const ToggleButton = ({ text, isActive, onClick }) => {
  return (
    <button
      className={`toggle-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ToggleButton;
