import React from 'react';
import '../../styles/profile/CreateResumeCard.css';

import EditIcon from '../../assets/ic-file-edit.svg?raw';
import CoverLetterIcon from '../../assets/ic-cover-letter.svg?raw';
import WebsiteBuilderIcon from '../../assets/ic-website-builder.svg?raw';

const CreateResumeCard = ({ iconSrc, title, description, onClick, backgroundColor }) => {
    const getIcon = () => {
        if (iconSrc === '/ic-file-edit.svg') return EditIcon;
        if (iconSrc === '/ic-cover-letter.svg') return CoverLetterIcon;
        if (iconSrc === '/ic-website-builder.svg') return WebsiteBuilderIcon;
        return '';
    };

    const iconData = getIcon();

    return (
        <div className="create-resume-card" style={{ backgroundColor }} onClick={onClick}>
            <img
                src={`data:image/svg+xml;charset=utf8,${encodeURIComponent(iconData)}`}
                alt={title}
                className="card-icon"
            />
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
        </div>
    );
};

export default CreateResumeCard;