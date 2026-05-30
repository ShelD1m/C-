import React from 'react';
import '../../styles/ui/TextArea.css';

export default function TextArea({ placeholder, rows = 4, variant = 'gray', value, onChange }) {
  const className = `text-area ${variant}`;
  return (
    <textarea
      className={className}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={onChange}
    />
  );
}