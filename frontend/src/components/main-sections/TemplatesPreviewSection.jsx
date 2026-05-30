import Template1 from "../../assets/img-template-one.png";
import Template2 from "../../assets/img-template-two.png";
import Template3 from "../../assets/img-template-three.png";
import "../../styles/main-sections/TemplatesPreviewSection.css";

import {useNavigate} from "react-router-dom";

export default function TemplatesPreviewSection() {
    const navigate = useNavigate();

    const templates = [
        {id: "modern", image: Template1, name: "Современный"},
        {id: "classic", image: Template2, name: "Классический"},
        {id: "creative", image: Template3, name: "Креативный"},
    ];

    const handleTemplateClick = (templateId) => {
        navigate(`/edit/${templateId}`);
    };

    return (
        <div className="templates-preview-section">
            <p className="section-title">Примеры резюме</p>
            <div className="templates-container">
                {templates.map((tmpl) => (
                    <div
                        key={tmpl.id}
                        className="template-card"
                        onClick={() => handleTemplateClick(tmpl.id)}
                        style={{cursor: "pointer"}}
                    >
                        <img src={tmpl.image} alt={`Шаблон ${tmpl.name}`}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
