import React from "react";
import AddItemIcon from "../../assets/ic-add-item.svg";
import "../../styles/ui/AddingButton.css";

export default function AddingButton({ text, onClick }) {
  return (
    <button className="adding-button" type="button" onClick={onClick}>
      <img src={AddItemIcon} alt="add item" className="button-icon" />
      <span>{text}</span>
    </button>
  );
}