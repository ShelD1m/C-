import React from "react";
import InputField from "../ui/InputField.jsx";
import MainButton from "../ui/MainButton.jsx";
import blobImage from "../../assets/background_blob.svg";
import "../../styles/main-sections/LetsCreateResumeSection.css";
import {Link} from "react-router-dom";

export default function LetsCreateResumeSection() {
    return (
        <section className="lets-create-section">
            <div className="image">
                <img
                    src={blobImage}
                    alt="Декоративная форма"
                    className="blob-image"
                />
            </div>

            <div className="content">
                <span className="hero-badge">Конструктор резюме нового поколения</span>
                <h1 className="title">
                    Будущее работы начинается с твоего резюме
                </h1>
                <p className="subtitle">
                    Собери аккуратное резюме, выбери стильный шаблон и быстро подготовь документ для отклика на вакансию.
                </p>
                <div className="form hero-card">
                    <div className="hero-card-header">
                        <span>Быстрый старт</span>
                        <small>2 поля, чтобы начать</small>
                    </div>
                    <div className="inputs">
                        <InputField
                            placeholder="Имя"
                            variant="gray"
                        />
                        <InputField
                            placeholder="Профессия"
                            variant="gray"
                        />
                    </div>
                    <Link to="/edit" style={{ textDecoration: "none" }}>
                        <MainButton
                            text="Сгенерировать"
                            variant="tan"
                        />
                    </Link>
                </div>
                <div className="hero-points" aria-label="Преимущества сервиса">
                    <span>AI-подсказки</span>
                    <span>Шаблоны</span>
                    <span>Экспорт</span>
                </div>
            </div>
        </section>
    );
}
