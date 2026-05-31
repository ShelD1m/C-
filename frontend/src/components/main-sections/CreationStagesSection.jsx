import StageCard from "../StageCard.jsx";
import DataIcon from "../../assets/ic-data.svg";
import ResultIcon from "../../assets/ic-result.svg";
import TemplateIcon from "../../assets/ic-template.svg";
import MainButton from "../ui/MainButton.jsx";
import "../../styles/main-sections/CreationStagesSection.css"
import {Link} from "react-router-dom";

export default function CreationStagesSection() {
    return (
        <div className="creation-stages-section">
            <div className="creation-heading">
                <span className="section-kicker">Как это работает</span>
                <p className="section-title">Получить резюме можно за три простых шага</p>
            </div>
            <div className="stages">
                <StageCard
                    icon={TemplateIcon}
                    number="01"
                    title="ДИЗАЙН-ШАБЛОН"
                    description="Выберите визуальный стиль, который подходит под профессию и формат отклика."/>

                <StageCard
                    icon={DataIcon}
                    number="02"
                    title="ДАННЫЕ"
                    description="Заполните понятную анкету: опыт, образование, навыки и контакты."/>

                <StageCard
                    icon={ResultIcon}
                    number="03"
                    title="РЕЗУЛЬТАТ"
                    description="Проверьте готовое резюме, скачайте его и отправляйте работодателям."/>
            </div>
            <Link to="/edit" style={{ textDecoration: "none" }}>
                <MainButton
                    text="Создать резюме"
                    variant="rose"/>
            </Link>
        </div>
    )
}
