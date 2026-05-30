import React, {useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {resumeSchema} from './schema.js';
import {demoResumeData} from '../../demo-data/demoResumeData.js';
import {mapFormToResumeData, mapResumeDataToForm} from '../../utils/mapResumeData.jsx';
import MainButton from '../ui/MainButton.jsx';
import PersonalInfoSection from './sections/PersonalInfoSection.jsx';
import ContactsSection from './sections/ContactsSection.jsx';
import EducationSection from './sections/EducationSection.jsx';
import WorkExperienceSection from './sections/WorkExperienceSection.jsx';
import AdditionalEducationSection from './sections/AdditionalEducationSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';
import '../../styles/ui/ResumeForm.css';

export default function ResumeForm({onSubmitForm, onPreviewChange, initialData = demoResumeData, submitText = "Создать резюме"}) {
    const defaultValues = useMemo(() => mapResumeDataToForm(initialData), [initialData]);

    const {control, handleSubmit, formState: {errors}, watch, reset} = useForm({
        mode: 'onChange',
        resolver: yupResolver(resumeSchema),
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const watchedData = watch();

    useEffect(() => {
        const previewData = mapFormToResumeData(watchedData);
        onPreviewChange?.(previewData);
    }, [watchedData, onPreviewChange]);

    const onSubmit = (data) => {
        const formattedData = mapFormToResumeData(data);
        onSubmitForm?.(formattedData);
    };

    return (
        <div className="resume-page">
            <form onSubmit={handleSubmit(onSubmit)} className="resume-form">
                <PersonalInfoSection control={control}/>
                <ContactsSection control={control} errors={errors}/>
                <WorkExperienceSection control={control} errors={errors}/>
                <EducationSection control={control} errors={errors}/>
                <AdditionalEducationSection control={control} errors={errors}/>
                <SkillsSection control={control} errors={errors}/>
                <div className="button-center-container">
                    <MainButton text={submitText} variant="rose" type="submit"/>
                </div>
            </form>
        </div>
    );
}
