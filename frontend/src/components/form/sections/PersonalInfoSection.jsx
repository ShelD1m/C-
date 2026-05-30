import React from 'react';
import {Controller} from 'react-hook-form';
import InputField from '../../ui/InputField.jsx';
import PhotoUpload from '../PhotoUpload.jsx';
import SectionHeader from '../SectionHeader.jsx';
import DatePickerField from '../DatePickerField.jsx';
import PersonalDataIcon from '../../../assets/ic-personal-data.svg';
import '../../../styles/PersonalInfoSection.css';

export default function PersonalInfoSection({control}) {
    return (
        <section className="personal-info-section section">
            <SectionHeader
                iconSrc={PersonalDataIcon}
                title="Личные данные"
            />
            <div className="personal-info-layout">
                <div className="photo-column">
                    <Controller
                        name="photo"
                        control={control}
                        render={({field: {value, onChange}}) => (
                            <PhotoUpload value={value} onChange={onChange}/>
                        )}
                    />
                </div>

                <div className="fields-column">
                    <div className="group-column">
                        <Controller
                            name="firstName"
                            control={control}
                            render={({field}) => (
                                <InputField placeholder="Имя" variant="gray" {...field} />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({field}) => (
                                <InputField placeholder="Фамилия" variant="gray" {...field} />
                            )}
                        />
                        <Controller
                            name="middleName"
                            control={control}
                            render={({field}) => (
                                <InputField placeholder="Отчество" variant="gray" {...field} />
                            )}
                        />
                    </div>
                    <div className="group-column">
                        <DatePickerField
                            name="birthDate"
                            control={control}
                            placeholderText="Дата рождения"
                            maxDate={new Date()}
                        />
                        <Controller
                            name="country"
                            control={control}
                            render={({field}) => (
                                <InputField placeholder="Страна" variant="gray" {...field} />
                            )}
                        />
                        <Controller
                            name="city"
                            control={control}
                            render={({field}) => (
                                <InputField placeholder="Город" variant="gray" {...field} />
                            )}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
