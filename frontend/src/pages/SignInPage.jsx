import React, {useState} from "react";
import InputField from "../components/ui/InputField.jsx";
import MainButton from "../components/ui/MainButton.jsx";
import TextButtonWithIcon from "../components/ui/TextButtonWithIcon.jsx";
import "../styles/pages/SignUpAndInPages.css";
import Header from "../components/ui/Header.jsx";

import googleIcon from "../assets/ic-google.svg";
import hhIcon from "../assets/ic-hh.svg";
import backArrow from "../assets/ic-arrow-left.svg";
import nextArrow from "../assets/ic-arrow-right.svg";
import {Link, useNavigate} from "react-router-dom";
import {api, setToken} from "../api/client.js";

export default function SignInPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await api.login(formData);
            setToken(response.token);
            navigate("/profile");
        } catch (err) {
            setError(err.message || "Не удалось войти");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header variant="secondary"/>
            <div className="signupin-page">
                <div className="arrow-buttons">
                    <TextButtonWithIcon
                        text="Обратно"
                        icon={backArrow}
                        iconSide="left"
                        color="dark"
                        onClick={() => navigate(-1)}
                    />
                    <Link to="/reg" style={{ textDecoration: "none" }}>
                        <TextButtonWithIcon
                            text="Еще нет аккаунта?"
                            icon={nextArrow}
                            iconSide="right"
                            color="tan"
                        />
                    </Link>
                </div>
                <div className="signupin-container">
                    <form className="signupin-form" onSubmit={handleSubmit}>
                        <h2>Войти</h2>
                        <div className="input-fields">
                            <InputField
                                placeholder="Электронная почта"
                                variant="gray"
                                value={formData.email}
                                onChange={handleInputChange("email")}
                            />
                            <InputField
                                placeholder="Пароль"
                                variant="gray"
                                value={formData.password}
                                type="password"
                                onChange={handleInputChange("password")}
                            />
                        </div>
                        {error && <p style={{color: "#b00020", marginTop: 8}}>{error}</p>}
                        <MainButton
                            text={loading ? "Вход..." : "Войти"}
                            variant="tan"
                            type="submit"
                            disabled={loading}
                        />
                    </form>

                    <div className="social-login">
                        <h2>или</h2>

                        <TextButtonWithIcon
                            text="Войти при помощи Google"
                            icon={googleIcon}
                            iconSide="left"
                            color="dark"
                            bordered={true}
                            onClick={() => alert('OAuth можно подключить следующим этапом')}
                        />

                        <TextButtonWithIcon
                            text="Войти при помощи Hh"
                            icon={hhIcon}
                            iconSide="left"
                            color="dark"
                            bordered={true}
                            onClick={() => alert('Импорт hh.ru можно подключить следующим этапом')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
