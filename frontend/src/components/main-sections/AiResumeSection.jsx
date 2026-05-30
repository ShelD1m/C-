import React from "react";
import MainButton from "../ui/MainButton.jsx";
import "../../styles/main-sections/AiResumeSection.css";
import aiPromoImage from "../../assets/ai-promo-image.svg";
import {Link} from "react-router-dom";

const AiResumeSection = () => {
    return (
        <section className="ai-section-container">
            <div className="ai-section-text-content">
                <h1 className="ai-section-title">
                    Создайте идеальное резюме за минуты с помощью искусственного
                    интеллекта
                </h1>
                <p className="ai-section-description">
                    Резюме+ — это чилл-ассистент с ИИ, который превращает твои навыки в
                    нормальное резюме. Без заморочек с шаблонами и долгих правок — просто
                    заполни необходимые поля, а мы доведем до ума.
                </p>
                <p className="ai-section-cta">
                    Получи резюме, которое зайдет работодателям!
                </p>
                <Link to="/edit" style={{ textDecoration: "none" }}>
                    <MainButton text="Создать резюме при помощи AI" variant="tan"/>
                </Link>

            </div>

            <div className="ai-section-image-content">
                <img src={aiPromoImage} alt="Женщина и робот создают резюме"/>
            </div>
        </section>
    );
};

export default AiResumeSection;
