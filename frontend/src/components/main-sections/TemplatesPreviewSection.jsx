import Template1 from "../../assets/img-template-one.png";
import Template2 from "../../assets/Test_template.png";
import Template3 from "../../assets/img-template-three.png";
import "../../styles/main-sections/TemplatesPreviewSection.css";

import {useNavigate} from "react-router-dom";

export default function TemplatesPreviewSection() {
    const navigate = useNavigate();

    const templates = [
        {id: "modern", image: Template1, name: "Современный", desc: "для офисных и digital-профессий"},
        {id: "classic", image: Template2, name: "Классический", desc: "строгий формат для уверенной подачи"},
        {id: "creative", image: Template3, name: "Креативный", desc: "акцент на индивидуальность"},
    ];

    const handleTemplateClick = (templateId) => {
        navigate(`/edit/${templateId}`);
    };

    return (
        <div className="templates-preview-section">
            <div className="templates-heading">
                <p className="section-kicker">Выбор оформления</p>
                <p className="section-title">Примеры резюме</p>
            </div>
            <div className="templates-container">
                {templates.map((tmpl) => (
                    <div
                        key={tmpl.id}
                        className="template-card"
                        onClick={() => handleTemplateClick(tmpl.id)}
                    >
                        <img src={tmpl.image} alt={`Шаблон ${tmpl.name}`}/>
                        <div className="template-card-caption">
                            <strong>{tmpl.name}</strong>
                            <span>{tmpl.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
