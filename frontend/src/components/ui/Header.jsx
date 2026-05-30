import React from 'react';
import '../../styles/ui/Header.css';
import MainButton from "./MainButton.jsx";
import SecondaryButton from "./SecondaryButton.jsx";
import {Link} from "react-router-dom";

export default function Header({variant = 'home'}) {
    return (
        <header className={`header header-${variant}`}>
            <div className="header-content">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="header-logo">
                        <img src="/logo-icon.svg" alt="Resume+ Logo" className="logo-icon"/>
                        <span className="logo-text">Резюме+</span>
                    </div>
                </Link>
                {variant === 'main-screen' && (
                    <div className="header-actions">
                        <Link to="/auth" style={{ textDecoration: "none" }}>
                            <SecondaryButton
                                text="Войти"
                                className="sign-in-button"/>
                        </Link>
                        <Link to="/edit" style={{ textDecoration: "none" }}>
                            <MainButton
                                text="Создать резюме"
                                className="create-resume-button"/>
                        </Link>
                    </div>
                )}
                {variant === 'articles-screen' && (
                    <>
                        <nav className="header-nav">
                            <a href="#" className="nav-link">Анализ</a>
                            <a href="#" className="nav-link">Вакансии</a>
                            <a href="#" className="nav-link">О нас</a>
                        </nav>
                        <div className="header-actions">
                            <button className="action-button">Создать резюме</button>
                        </div>
                    </>
                )}
                {variant === 'empty' && null}
            </div>
        </header>
    );
}