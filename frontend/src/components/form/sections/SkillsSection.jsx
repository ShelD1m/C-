import React, { useEffect } from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import CustomDropdown from '../../../components/ui/CustomDropdown';
import SectionHeader from '../SectionHeader.jsx';
import TextArea from '../../ui/TextArea.jsx';
import AddingButton from '../AddingButton.jsx';
import SkillsIcon from '../../../assets/ic-skills.svg';
import CancelIcon from '../../../assets/ic-cancel.svg';
import { skillsHints } from '../../../tips/hints';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const languages = ['Английский', 'Немецкий', 'Французский', 'Испанский', 'Итальянский', 'Китайский', 'Японский'];

export default function SkillsSection({ control, errors }) {
    const { fields, append, remove } = useFieldArray({ control, name: 'languages' });

    useEffect(() => {
        if (fields.length === 0) {
            append({ language: '', level: '' });
        }
    }, [fields.length, append]);

    return (
        <section className="skills-section section">
            <SectionHeader
                iconSrc={SkillsIcon}
                title="Навыки и компетенции"
                hints={skillsHints}
            />

            <div className="checkbox-group">
                <label className="checkbox-label">
                    <Controller
                        name="medicalSkills"
                        control={control}
                        render={({ field }) => <input type="checkbox" className="checkbox-input" {...field} />}
                    />
                    Наличие медицинской книжки
                </label>
                {errors.medicalSkills && <p className="error">{errors.medicalSkills.message}</p>}
            </div>

            <div className="checkbox-group">
                <label className="checkbox-label">
                    <Controller
                        name="militarySkills"
                        control={control}
                        render={({ field }) => <input type="checkbox" className="checkbox-input" {...field} />}
                    />
                    Наличие военного билета
                </label>
                {errors.militarySkills && <p className="error">{errors.militarySkills.message}</p>}
            </div>

            <label className="group-label">Водительское удостоверение:</label>
            <div className="group">
                {['A', 'A1', 'B', 'BE', 'C', 'CE', 'D', 'DE', 'M', 'Tb', 'Tm'].map(category => (
                    <label key={category} className="checkbox-label">
                        <Controller
                            name={`driverCategories.${category}`}
                            control={control}
                            render={({ field }) => <input type="checkbox" className="checkbox-input" {...field} />}
                        />
                        {category}
                    </label>
                ))}
            </div>

            <label className="group-label">Знание иностранных языков</label>
            {fields.map((field, index) => (
                <div className="group">
                    <div key={field.id} className="section-item-transparent">
                        <div className='group'>
                            <div className="dropdown-container">
                                <Controller
                                    name={`languages.${index}.language`}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomDropdown placeholder = 'Язык' options={languages} initialValue={value} onSelect={onChange} />
                                    )}
                                />
                                {/* {errors.languages?.[index]?.language && <p className="error">{errors.languages[index].language.message}</p>} */}
                            </div>
                            <div className="dropdown-container">
                                <Controller
                                    name={`languages.${index}.level`}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomDropdown placeholder = 'Уровень' options={levels} initialValue={value} onSelect={onChange} />
                                    )}
                                />
                                {/* {errors.languages?.[index]?.level && <p className="error">{errors.languages[index].level.message}</p>} */}
                            </div>
                            <button className="delete-button" onClick={() => remove(index)}>
                                <img src={CancelIcon} alt="Remove" className="cancel-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <AddingButton
                text="Добавить иностранный язык"
                onClick={() => append({ language: '', level: '' })}
            />

            <Controller
                name="personalQualities"
                control={control}
                render={({ field }) => <TextArea placeholder="Личные качества" rows={4} {...field} />}
            />
            {/* {errors.personalQualities && <p className="error">{errors.personalQualities.message}</p>} */}

            <Controller
                name="professionalSkills"
                control={control}
                render={({ field }) => <TextArea placeholder="Профессиональные навыки" rows={4} {...field} />}
            />
            {/* {errors.professionalSkills && <p className="error">{errors.professionalSkills.message}</p>} */}

            <Controller
                name="about"
                control={control}
                render={({ field }) => <TextArea placeholder="О себе" rows={4} {...field} />}
            />
            {/* {errors.about && <p className="error">{errors.about.message}</p>} */}
        </section>
    );
}