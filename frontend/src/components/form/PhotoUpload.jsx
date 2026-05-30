import React, {useRef, useEffect, useState} from 'react';
import '../../styles/ui/PhotoUpload.css';
import icEditPhoto from '../../assets/ic_edit_photo.svg';
import icRemovePhoto from '../../assets/ic_remove_photo.svg';

export default function PhotoUpload({value, onChange}) {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(value || null);

    useEffect(() => {
        setPreview(value || null);
    }, [value]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onChange(url);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleCustomButtonClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    return (
        <div className="photo-upload">
            <div className="photo-container">
                {preview ? (
                    <>
                        <img src={preview} alt="Фото профиля" className="photo-preview"/>
                        <div className="photo-actions">
                            <button
                                className="photo-action edit"
                                onClick={handleCustomButtonClick}
                                aria-label="Edit photo"
                            >
                                <img src={icEditPhoto} alt="Edit" className="action-icon"/>
                            </button>
                            <button
                                className="photo-action delete"
                                onClick={handleRemove}
                                aria-label="Delete photo"
                            >
                                <img src={icRemovePhoto} alt="Delete" className="action-icon"/>
                            </button>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleChange}
                            style={{display: 'none'}}
                        />
                    </>
                ) : (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleChange}
                            style={{display: 'none'}}
                        />
                        <button className="custom-upload-button" onClick={handleCustomButtonClick}>
                            Выбрать файл
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
