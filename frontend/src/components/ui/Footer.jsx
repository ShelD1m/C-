import React from 'react';
import '../../styles/ui/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-group">
          <span className="footer-copyright footer-link-bold">2025 © Made by Resume+</span>
        </div>
        <nav className="footer-links">
          <div className="footer-group">
            <a href="#" className="footer-link footer-link-bold">Резюме+</a>
            <a href="#" className="footer-link">Цены</a>
            <a href="#" className="footer-link">Условия и положения</a>
            <a href="#" className="footer-link">Политика конфиденциальности</a>
          </div>
          <div className="footer-group">
            <a href="#" className="footer-link footer-link-bold">Поддержка</a>
            <a href="#" className="footer-link">О нас</a>
           <a href="#" className="footer-link">Связаться с нами</a>
          </div>
          <div className="footer-group">
            <a href="#" className="footer-link footer-link-bold">Блог</a>
            <a href="#" className="footer-link">Читать полезные статьи</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}