import StageCard from "../StageCard.jsx";
import DataIcon from "../../assets/ic-data.svg";
import ResultIcon from "../../assets/ic-result.svg";
import TemplateIcon from "../../assets/ic-template.svg";
import MainButton from "../ui/MainButton.jsx";
import "../../styles/main-sections/CreationStagesSection.css"
import {Link} from "react-router-dom";

export default function CreationStagesSection() {
    return (
        <div className={"creation-stages-section"}>
            <p className={"section-title"}>Получить резюме можно за три простых шага:</p>
            <div className={"stages"}>
                <StageCard
                    icon={TemplateIcon}
                    title="ДИЗАЙН-ШАБЛОН"
                    description="Выберите шаблон, который подчеркнет вашу индивидуальность!"/>

                <StageCard
                    icon={DataIcon}
                    title="ДАННЫЕ"
                    description="Заполните простую анкету, указав всё необходимое всего за 10 минут!"/>

                <StageCard
                    icon={ResultIcon}
                    title="РЕЗУЛЬТАТ"
                    description="Скачайте готовое резюме в удобном формате и отправляйте работодателям!"/>
            </div>
            <Link to="/edit" style={{ textDecoration: "none" }}>
                <MainButton
                    text="Создать резюме"
                    variant="rose"/>
            </Link>
        </div>
    )
}