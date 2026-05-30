import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {debounce} from 'lodash';
import ResumeForm from "../components/form/ResumeForm.jsx";
import ResumeRenderer from "../components/templates/ResumeRenderer.jsx";
import {demoResumeData} from "../demo-data/demoResumeData.js";
import "../styles/pages/ResumeEditorPage.css";
import Header from "../components/ui/Header.jsx";
import Footer from "../components/ui/Footer.jsx";
import {api, getToken} from "../api/client.js";

const debouncedSetPreview = debounce((data, setState) => {
    setState(data);
}, 300);

export default function ResumeEditorPage() {
    const {template: urlTemplate, resumeId} = useParams();
    const navigate = useNavigate();

    const [resumeData, setResumeData] = useState(demoResumeData);
    const [initialData, setInitialData] = useState(demoResumeData);
    const [resumeTitle, setResumeTitle] = useState("");
    const [loading, setLoading] = useState(Boolean(resumeId));
    const [error, setError] = useState("");

    const selectedTemplate = urlTemplate && ["modern", "classic", "creative"].includes(urlTemplate)
        ? urlTemplate
        : "modern";

    useEffect(() => {
        if (!urlTemplate) {
            navigate("/edit/modern", {replace: true});
        }
    }, [urlTemplate, navigate]);

    useEffect(() => {
        if (!resumeId) return;
        const loadResume = async () => {
            setLoading(true);
            setError("");
            try {
                const resume = await api.getResume(resumeId);
                setInitialData(resume.data || demoResumeData);
                setResumeData(resume.data || demoResumeData);
                setResumeTitle(resume.title || "");
            } catch (err) {
                setError(err.message || "Не удалось загрузить резюме");
            } finally {
                setLoading(false);
            }
        };
        loadResume();
    }, [resumeId]);

    const handlePreviewChange = (previewData) => {
        debouncedSetPreview(previewData, setResumeData);
    };

    const handleFormSubmit = async (finalData) => {
        if (!getToken()) {
            navigate('/auth');
            return;
        }

        setError("");
        const title = finalData?.personal?.desiredPosition || resumeTitle || "Новое резюме";
        const payload = {
            title,
            template: selectedTemplate,
            data: finalData,
        };

        try {
            if (resumeId) {
                await api.updateResume(resumeId, payload);
            } else {
                await api.createResume(payload);
            }
            navigate('/profile');
        } catch (err) {
            setError(err.message || "Не удалось сохранить резюме");
        }
    };

    return (
        <>
            <Header variant="secondary"/>
            <div className="resume-edit-page">
                <div className="resume-edit-page-form">
                    {loading ? (
                        <p style={{padding: 24}}>Загрузка резюме...</p>
                    ) : (
                        <>
                            {error && <p style={{color: "#b00020", padding: "16px 24px"}}>{error}</p>}
                            <ResumeForm
                                initialData={initialData}
                                onPreviewChange={handlePreviewChange}
                                onSubmitForm={handleFormSubmit}
                                submitText={resumeId ? "Сохранить резюме" : "Создать резюме"}
                            />
                        </>
                    )}
                </div>
                <div className="resume-edit-page-preview">
                    <ResumeRenderer
                        data={resumeData}
                        template={selectedTemplate}
                    />
                </div>
            </div>
            <Footer/>
        </>
    );
}
