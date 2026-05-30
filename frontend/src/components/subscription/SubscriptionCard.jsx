import React, { useState } from "react";
import MainButton from "../ui/MainButton.jsx";
import ToggleButton from "../ui/ToggleButton.jsx";
import checkmarkIcon from "../../assets/ic-checkmark.svg";
import infoIcon from "../../assets/ic-info-circle.svg";
import arrowRightIcon from "../../assets/ic-white-arrow-right.svg";
import "../../styles/subscription/SubscriptionCard.css";
import premiumLogo from "../../assets/logo-icon-premium.svg";

export default function SubscriptionCard() {
  const [plan, setPlan] = useState("monthly");

  const features = [
    "30+ профессиональных шаблонов резюме",
    "30+ шаблонов сопроводительных писем",
    "7 шаблонов персональных веб-сайтов",
    "Полная кастомизация резюме",
    "Все функции генерации с AI",
    "Быстрая поддержка",
    "Карьерная карта",
    "Анализатор резюме",
  ];

  return (
    <div className="subscription-card">
      <div className="card-left">
        <div className="premium-logo-container">
          <img
            src={premiumLogo}
            alt="Резюме+ Premium"
            className="logo-premium"
          />
          <span className="premium-text">
            Резюме+ <span className="premium-highlight">premium</span>
          </span>
        </div>
        <div className="price-section">
          {plan === "monthly" ? (
            <>
              {" "}
              <h1 className="price">₽ 299 / мес.</h1>{" "}
              <p className="price-desc">Оплата каждый месяц</p>{" "}
            </>
          ) : (
            <>
              {" "}
              <h1 className="price">₽ 2 388 / год</h1>{" "}
              <p className="price-desc">Оплата каждый месяц 199 ₽</p>{" "}
            </>
          )}
        </div>

        <p className="plan-period-label">Выберите оплачиваемый период:</p>
        <div className="plan-toggle">
          <ToggleButton
            text="Месяц"
            isActive={plan === "monthly"}
            onClick={() => setPlan("monthly")}
          />
          <ToggleButton
            text="Год"
            isActive={plan === "yearly"}
            onClick={() => setPlan("yearly")}
          />
        </div>

        <MainButton variant="rose">
          Купить сейчас
          <img src={arrowRightIcon} alt="->" />
        </MainButton>
      </div>

      <div className="card-divider"></div>

      <div className="card-right">
        <div className="close-button">×</div>{" "}
        <h2 className="features-title">Все преимущества, одна подписка.</h2>
        <p className="features-subtitle">
          128 подписок оформили за последние 72 часа
        </p>
        <ul className="features-list">
          {features.map((feature, index) => (
            <li key={index} className="feature-item">
              <img src={checkmarkIcon} alt="checkmark" />
              <span>{feature}</span>
              <img src={infoIcon} alt="info" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
