import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/profile/UpgradeCard.css';
import MainButton from '../ui/MainButton';

const UpgradeCard = () => {
    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        navigate('/subscript');
    };

    return (
        <div className="upgrade-card">
            <p className="upgrade-text">Сейчас: бесплатная подписка</p>
            <MainButton text="Прокачать резюме" onClick={handleUpgradeClick} variant="vanilla" />
        </div>
    );
};

export default UpgradeCard;