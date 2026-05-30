import React from "react";
import ResumeTemplate from "./ResumeTemplate.jsx";

const ResumeRenderer = ({data, template}) => {
    return <div className="resume-preview-aspect-wrapper">
        <ResumeTemplate data={data} template={template}/>
    </div>
};

export default ResumeRenderer;