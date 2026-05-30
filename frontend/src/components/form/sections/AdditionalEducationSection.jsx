import React, { useEffect } from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import InputField from '../../../components/ui/InputField';
import CustomDropdown from '../../../components/ui/CustomDropdown';
import SectionHeader from '../SectionHeader';
import AddingButton from '../AddingButton';
import { additionalEducationHints } from '../../../tips/hints';
import CancelIcon from "../../../assets/ic-cancel.svg";
import AdditionalEducationIcon from "../../../assets/ic-additional-education.svg";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i).map(String);

export default function AdditionalEducationSection({ control }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'additionalEducation' });

  useEffect(() => {
    if (fields.length === 0) {
      append({ course: '', provider: '', year: '' });
    }
  }, [fields.length, append]);

  return (
    <section className="additional-education-section section">
        
      <SectionHeader 
                iconSrc={AdditionalEducationIcon} 
                title="Дополнительное образование" 
                hints={additionalEducationHints}
            />
      {fields.map((field, index) => (
        <div key={field.id} className="section-item-transparent">
          <Controller
            name={`additionalEducation.${index}.course`}
            control={control}
            render={({ field }) => <InputField placeholder="Курсы, тренинги, семинары, стажировки и другое" variant="gray" {...field} />}
          />
          {/* {errors.additionalEducation?.[index]?.course && <p className="error">{errors.additionalEducation[index].course.message}</p>} */}
                <div className="checkbox-group">
                  <label className="checkbox-label">
                      <Controller
                      name="militarySkills"
                      control={control}
                      render={({ field }) => <input type="checkbox" className="checkbox-input" {...field} />}
                    />
                    Наличие сертификата/свидетельства
                  </label>
                  {/* {errors.militarySkills && <p className="error">{errors.militarySkills.message}</p>} */}
                </div>
          <Controller
            name={`additionalEducation.${index}.provider`}
            control={control}
            render={({ field }) => <InputField placeholder="Организация, проводившая обучение" variant="gray" {...field} />}
          />
          {/* {errors.additionalEducation?.[index]?.provider && <p className="error">{errors.additionalEducation[index].provider.message}</p>} */}
          <div className='add-edu-group'>
          <div className='dropdown-container'>
          <Controller
            name={`additionalEducation.${index}.year`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomDropdown placeholder="Год прохождения"options={years} initialValue={value} onSelect={onChange} />
            )}
          />
          {/* {errors.additionalEducation?.[index]?.year && <p className="error">{errors.additionalEducation[index].year.message}</p>} */}
          </div>
          <button className="delete-button" onClick={() => remove(index)}>
            <img src={CancelIcon} alt="Remove" className="cancel-icon" />
            </button>
          
        </div>
        </div>
      ))}
      <AddingButton
              text="Добавить дополнительное образование"
              onClick={() => append({ course: '', provider: '', year: '' })}
          />
    
    </section>
  );
}