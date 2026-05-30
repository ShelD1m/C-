import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ResumeRenderer from '../components/templates/ResumeRenderer.jsx';
import Header from '../components/ui/Header.jsx';
import Footer from '../components/ui/Footer.jsx';
import {api} from '../api/client.js';
import '../styles/pages/ResumeEditorPage.css';

export default function PublicResumePage() {
    const {slug} = useParams();
    const [resume, setResume] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            setError('');
            try {
                const response = await api.getPublicResume(slug);
                setResume(response);
            } catch (err) {
                setError(err.message || 'Публичное резюме не найдено');
            }
        };
        load();
    }, [slug]);

    return (
        <>
            <Header variant="secondary"/>
            <main style={{maxWidth: 980, margin: '32px auto', padding: '0 16px'}}>
                {error && <p style={{color: '#b00020'}}>{error}</p>}
                {!resume && !error && <p>Загрузка...</p>}
                {resume && (
                    <>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
                            <h1 style={{margin: 0}}>{resume.title}</h1>
                            <button onClick={() => window.print()} style={{padding: '10px 16px', borderRadius: 12, border: '1px solid #ddd', cursor: 'pointer'}}>
                                Печать / PDF
                            </button>
                        </div>
                        <ResumeRenderer data={resume.data} template={resume.template || 'modern'}/>
                    </>
                )}
            </main>
            <Footer/>
        </>
    );
}
