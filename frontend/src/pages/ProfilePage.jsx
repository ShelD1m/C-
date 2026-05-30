import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../components/profile/Sidebar.jsx';
import ImportCard from '../components/profile/ImportCard.jsx';
import CreateResumeCard from '../components/profile/CreateResumeCard.jsx';
import {api, API_URL, clearToken, getToken} from '../api/client.js';
import '../styles/pages/ProfilePage.css';
import '../App.css';

function ProfilePage() {
    const navigate = useNavigate();
    const pdfInputRef = useRef(null);
    const jsonInputRef = useRef(null);

    const [user, setUser] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadProfile = async () => {
        if (!getToken()) {
            navigate('/auth');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const profile = await api.profile();
            setUser(profile.user);
            setResumes(profile.resumes || []);
        } catch (err) {
            setError(err.message || 'Не удалось загрузить профиль');
            if (String(err.message).toLowerCase().includes('unauthorized')) {
                clearToken();
                navigate('/auth');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleImportPDF = () => pdfInputRef.current?.click();
    const handleImportJSON = () => jsonInputRef.current?.click();

    const onPDFFileChange = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        if (file.type !== 'application/pdf') {
            alert('Пожалуйста, выберите PDF-файл.');
            return;
        }
        try {
            await api.importPdf(file);
            await loadProfile();
            alert('PDF загружен. Создана черновая карточка резюме.');
        } catch (err) {
            alert(err.message || 'Не удалось импортировать PDF');
        }
    };

    const onJSONFileChange = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        try {
            await api.importJson(file);
            await loadProfile();
            alert('JSON успешно импортирован');
        } catch (err) {
            alert(err.message || 'Ошибка импорта JSON');
        }
    };

    const logout = () => {
        clearToken();
        navigate('/auth');
    };

    const deleteResume = async (id) => {
        if (!confirm('Удалить это резюме?')) return;
        await api.deleteResume(id);
        await loadProfile();
    };

    const publishResume = async (id) => {
        await api.publishResume(id);
        await loadProfile();
    };

    const unpublishResume = async (id) => {
        await api.unpublishResume(id);
        await loadProfile();
    };

    const downloadJson = async (id) => {
        const response = await fetch(`${API_URL}/resumes/${id}/export/json`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        if (!response.ok) {
            alert('Не удалось скачать JSON');
            return;
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume-${id}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="app-container">
            <Sidebar userName={user?.name} userLabel={user?.subscriptionPlan || 'Мой аккаунт'} />
            <main className="main-content">
                <div className="content-wrapper">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16}}>
                        <h1 className="greeting">Привет, {user?.name || 'пользователь'}!</h1>
                        <button onClick={logout} style={{padding: '10px 16px', borderRadius: 12, border: '1px solid #ddd', cursor: 'pointer'}}>
                            Выйти
                        </button>
                    </div>

                    {loading && <p>Загрузка...</p>}
                    {error && <p style={{color: '#b00020'}}>{error}</p>}

                    <section className="import-cards">
                        <h2 className="section-title">Импорт данных</h2>
                        <div className="import-cards-container">
                            <ImportCard
                                iconSrc="/ic-file-export.svg"
                                title="PDF"
                                description="Загрузи свое старое резюме в формате .pdf и преобразуй его"
                                onClick={handleImportPDF}
                                backgroundColor="rgba(77, 167, 179, 0.25)"
                            />
                            <ImportCard
                                iconSrc="/ic-hh.svg"
                                title="JSON / hh.ru"
                                description="Импортируй структуру резюме из JSON-файла"
                                onClick={handleImportJSON}
                                backgroundColor="rgba(167, 89, 120, 0.25)"
                            />
                        </div>
                    </section>

                    <section className="create-resume-cards">
                        <h2 className="section-title">Создание идеального резюме</h2>
                        <div className="create-resume-cards-container">
                            <CreateResumeCard
                                iconSrc="/ic-file-edit.svg"
                                title="Конструктор резюме"
                                description="Создавай и редактируй свои резюме при помощи ИИ"
                                onClick={() => navigate('/edit/modern')}
                                backgroundColor="rgba(218, 183, 133, 0.25)"
                            />
                            <CreateResumeCard
                                iconSrc="/ic-cover-letter.svg"
                                title="Сопроводительное письмо"
                                description="Дополни резюме – рекрутер точно обратит внимание"
                                onClick={() => alert('Генератор письма можно подключить на следующем этапе через /api/ai')}
                                backgroundColor="rgba(218, 183, 133, 0.25)"
                            />
                            <CreateResumeCard
                                iconSrc="/ic-website-builder.svg"
                                title="Конструктор сайта"
                                description="Преврати свое резюме в персональный веб-сайт одним кликом"
                                onClick={() => alert('Публикация резюме уже доступна через кнопку в списке резюме')}
                                backgroundColor="rgba(218, 183, 133, 0.25)"
                            />
                        </div>
                    </section>

                    <section className="my-resumes-section">
                        <h2 className="section-title">Мои резюме</h2>
                        {!loading && resumes.length === 0 && (
                            <p>Пока резюме нет. Нажми «Конструктор резюме», чтобы создать первое.</p>
                        )}
                        <div className="resume-list">
                            {resumes.map((resume) => (
                                <article className="resume-list-card" key={resume.id}>
                                    <div>
                                        <h3>{resume.title}</h3>
                                        <p>Шаблон: {resume.template}</p>
                                        <p>Просмотров: {resume.views} · Скачиваний: {resume.downloads}</p>
                                        {resume.published && resume.publicSlug && (
                                            <p>
                                                Публичная ссылка: <a href={`/r/${resume.publicSlug}`} target="_blank" rel="noreferrer">/r/{resume.publicSlug}</a>
                                            </p>
                                        )}
                                    </div>
                                    <div className="resume-list-actions">
                                        <button onClick={() => navigate(`/edit/${resume.template}/${resume.id}`)}>Редактировать</button>
                                        <button onClick={() => downloadJson(resume.id)}>Скачать JSON</button>
                                        {resume.published ? (
                                            <button onClick={() => unpublishResume(resume.id)}>Снять с публикации</button>
                                        ) : (
                                            <button onClick={() => publishResume(resume.id)}>Опубликовать</button>
                                        )}
                                        <button onClick={() => deleteResume(resume.id)}>Удалить</button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>

                <input type="file" ref={pdfInputRef} accept=".pdf" style={{ display: 'none' }} onChange={onPDFFileChange} />
                <input type="file" ref={jsonInputRef} accept=".json" style={{ display: 'none' }} onChange={onJSONFileChange} />
            </main>
        </div>
    );
}

export default ProfilePage;
