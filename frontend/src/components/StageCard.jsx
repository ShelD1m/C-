import React from "react";
import "../styles/StageCard.css";

export default function StageCard({icon, title, description, number}) {
    return(
        <div className="stage-card">
            <span className="stage-number">{number}</span>
            <div className="stage-icon-wrap">
                <img className="icon" src={icon} alt="stage icon"/>
            </div>
            <p className="stage-title">{title}</p>
            <p className="description">{description}</p>
        </div>
    )
}
