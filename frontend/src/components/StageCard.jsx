import React from "react";
import "../styles/StageCard.css";

export default function StageCard({icon, title, description}) {
    return(
        <div className={"stage-card"}>
            <img className={"icon"} src={icon} alt={"stage icon"}/>
            <p className={"stage-title"}>{title}</p>
            <p className={"description"}>{description}</p>
        </div>
    )
}
