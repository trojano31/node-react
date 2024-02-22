import React from 'react';
import { Control, Controller, FieldPath } from 'react-hook-form';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IHousingQueryParams } from '../types/housingQuery';

interface SelectOption {
  text: string;
  value: string;
}

interface IControlledSelect {
  options: SelectOption[];
  control: Control<IHousingQueryParams>;
  name: FieldPath<IHousingQueryParams>;
  label: string
}

const ControlledSelect = ({options, name, label, control}: IControlledSelect) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
        >
          {options.map(({ value, text }) => (
            <MenuItem key={value} value={value}>{text}</MenuItem>
          ))}
        </Select>
      )}
    />
    </FormControl>
  );
};

export { ControlledSelect };