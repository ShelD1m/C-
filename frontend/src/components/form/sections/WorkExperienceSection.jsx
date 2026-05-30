import React, { useState, useEffect } from 'react';
import { useFieldArray, Controller, useWatch } from 'react-hook-form';
import InputField from '../../ui/InputField.jsx';
import TextArea from '../../ui/TextArea.jsx';
import OptionButtonReversed from '../OptionButtonReversed.jsx';
import DatePickerField from '../DatePickerField.jsx';
import SectionHeader from '../SectionHeader.jsx';
import AddingButton from '../AddingButton.jsx';
import CancelIcon from '../../../assets/ic-cancel.svg';
import WorkExperienceIcon from '../../../assets/ic-work-experience.svg';
import { workExperienceHints } from '../../../tips/hints';

function WorkExperienceItem({ control, errors, index, onRemove }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSection = () => setIsOpen(!isOpen);

  const companyValue = useWatch({
    control,
    name: `workExperience.${index}.company`,
    defaultValue: '',
  });

  return (
    <div className="section-item-white">
      <div className="inner-section-header" onClick={toggleSection}>
        <div className="header-with-button">
          <OptionButtonReversed
            onClick={toggleSection}
            isOpen={isOpen}
          />
          <h3>{companyValue || 'Компания'}</h3>
        </div>
        <button 
          className="delete-button" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <img src={CancelIcon} alt="Remove" className="cancel-icon" />
        </button>
      </div>
      {isOpen && (
        <div className="work-content">
          <div className="group">
            <Controller
              name={`workExperience.${index}.company`}
              control={control}
              render={({ field }) => <InputField placeholder="Компания" variant="gray" {...field} />}
            />
           {/*  {errors.workExperience?.[index]?.company && <p className="error">{errors.workExperience[index].company.message}</p>} */}
            
            <Controller
              name={`workExperience.${index}.position`}
              control={control}
              render={({ field }) => <InputField placeholder="Должность" variant="gray" {...field} />}
            />
           {/*  {errors.workExperience?.[index]?.position && <p className="error">{errors.workExperience[index].position.message}</p>} */}
          </div>
          <div className="group">
            <Controller
              name={`workExperience.${index}.country`}
              control={control}
              render={({ field }) => <InputField placeholder="Страна" variant="gray" {...field} />}
            />
            {/* {errors.workExperience?.[index]?.country && <p className="error">{errors.workExperience[index].country.message}</p>} */}
            <Controller
              name={`workExperience.${index}.city`}
              control={control}
              render={({ field }) => <InputField placeholder="Город" variant="gray" {...field} />}
            />
            {/* {errors.workExperience?.[index]?.city && <p className="error">{errors.workExperience[index].city.message}</p>} */}
          </div>
          
          <div className="group">
            <DatePickerField
              name={`workExperience.${index}.startDate`}
              control={control}
              errors={errors.workExperience?.[index]}
              placeholderText="Дата трудоустройства"
              maxDate={new Date()}
            />
            <DatePickerField
              name={`workExperience.${index}.endDate`}
              control={control}
              errors={errors.workExperience?.[index]}
              placeholderText="Дата увольнения"
              maxDate={new Date()}
            />
          </div>
          
          <Controller
            name={`workExperience.${index}.description`}
            control={control}
            render={({ field }) => <TextArea placeholder="Обязанности" rows={4} {...field} />}
          />
          {/* {errors.workExperience?.[index]?.description && <p className="error">{errors.workExperience[index].description.message}</p>} */}
        </div>
      )}
    </div>
  );
}
export default function WorkExperienceSection({ control, errors }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'workExperience' });

  useEffect(() => {
    if (fields.length === 0) {
      append({ company: '', position: '', country: '', city: '', startDate: null, endDate: null, description: '' });
    }
  }, [fields.length, append]);

  return (
    <section className="work-experience-section section">
      <SectionHeader 
        iconSrc={WorkExperienceIcon} 
        title="Опыт работы" 
        hints={workExperienceHints}
      />
      {fields.map((field, index) => (
        <WorkExperienceItem
          key={field.id}
          control={control}
          errors={errors}
          index={index}
          onRemove={() => remove(index)}
        />
      ))}
      <AddingButton
        text="Добавить опыт работы"
        onClick={() => append({ company: '', position: '', country: '', city: '', startDate: null, endDate: null, description: '' })}
      />
    </section>
  );
}