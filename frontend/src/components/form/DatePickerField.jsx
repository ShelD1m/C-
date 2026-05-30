import React from 'react';
import { Controller } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

export default function DatePickerField({ name, control, onChange, errors, placeholderText = 'Выберите дату', maxDate = new Date() }) {
  return (
    <div className="date-picker-wrapper">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => {
              field.onChange(date);
              if (onChange) onChange(date);
            }}
            dateFormat="dd.MM.yyyy"
            placeholderText={placeholderText}
            locale="ru"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            maxDate={maxDate}
            className="date-picker date-picker-gray" 
            popperClassName="date-picker-popper" 
            calendarClassName="date-picker-calendar"
          />
        )}
      />
      {errors && errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
}