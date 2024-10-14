import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
export const handleKeyDown = e => {
  if (e.key === '-' || e.key === 'e' || e.key === 'E') {
    e.preventDefault(); // Block minus key
  }
};
export const NumericInput = ({ name }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    const inputValue = e.target.value;

    // Regular expression for numbers >= 0
    if (inputValue === '' || (/^\d*\.?\d*$/.test(inputValue) && parseFloat(inputValue) >= 0)) {
      setValue(inputValue);
      return;
    }
  };

  return (
    <TextField
      hiddenLabel
      name={name}
      type="number"
      variant="filled"
      className="number-input"
      slotProps={{
        htmlInput: {
          max: 60,
          min: 0,
        },
      }}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      size="small"
    />
  );
};
