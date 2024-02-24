import { Control, Controller, FieldPath } from 'react-hook-form';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IHousingQueryFormParams } from '../types/housingQuery';
import { SelectOption } from '../types/components';

interface IControlledSelect {
  options: SelectOption[];
  control: Control<IHousingQueryFormParams>;
  name: FieldPath<IHousingQueryFormParams>;
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
          {options.map(({ value, text, disabled }) => (
            <MenuItem key={value} value={value} disabled={disabled}>{text}</MenuItem>
          ))}
        </Select>
      )}
    />
    </FormControl>
  );
};

export { ControlledSelect };