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
                    alt="Декоративная лужа"
                    className="blob-image"
                />
            </div>

            <div className="content">
                <h1 className="title">
                    Будущее работы начинается с твоего резюме
                </h1>
                <p className="subtitle">
                    Используй Резюме+ и у тебя будет простой способ выделиться и покорить работодателей
                </p>
                <div className="form">
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
                </div>
                <Link to="/edit" style={{ textDecoration: "none" }}>
                    <MainButton
                        text="Сгенерировать"
                        variant="tan"
                    />
                </Link>
            </div>
        </section>
    );
}