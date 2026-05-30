import React from 'react';
import '../../styles/profile/ImportCard.css';

import HHIcon from '../../assets/ic-hh.svg?raw';
import ArrowSwitchIcon from '../../assets/ic-arrow-switch.svg?raw';
import FileExportIcon from '../../assets/ic-file-export.svg?raw';

const ImportCard = ({ iconSrc, title, description, onClick, backgroundColor }) => {
    const renderIcons = () => {
        if (iconSrc === '/ic-file-export.svg') {
            return (
                <img
                    src={`data:image/svg+xml;charset=utf8,${encodeURIComponent(FileExportIcon)}`}
                    alt={title}
                    className="card-icon"
                />
            );
        }

        if (iconSrc === '/ic-hh.svg') {
            return (
                <div className="hh-icons">
                    <img
                        src={`data:image/svg+xml;charset=utf8,${encodeURIComponent(ArrowSwitchIcon)}`}
                        alt="Стрелки"
                        className="arrow-switch-icon"
                    />
                    <img
                        src={`data:image/svg+xml;charset=utf8,${encodeURIComponent(HHIcon)}`}
                        alt="hh.ru"
                        className="hh-icon"
                    />
                </div>
            );
        }

        return null;
    };

    return (
        <div className="import-card" style={{ backgroundColor }} onClick={onClick}>
            {renderIcons()}
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
        </div>
    );
};

export default ImportCard;