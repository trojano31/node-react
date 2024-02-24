import { ControlledSelect } from '../../components/Select.tsx';
import { Button } from '@mui/material';
import { ISelectOption } from '../../types/components';
import { Control } from 'react-hook-form';
import { IHousingQueryFormParams } from '../../types/housingQuery';

interface IViewMainForm {
  quarters: ISelectOption[];
  housingTypes: ISelectOption[];
  control: Control<IHousingQueryFormParams>;
  tidToValue: string;
  tidFromValue: string;
}

const ViewMainForm = ({ quarters, housingTypes, tidFromValue, tidToValue, control }: IViewMainForm) => {
  return (
    <>
      <ControlledSelect name="Boligtype" label="Housing Type" options={housingTypes} control={control} />
      <ControlledSelect name="TidFrom" label="Quarter From" options={prepareFromQuarters()} control={control} />
      <ControlledSelect name="TidTo" label="Quarter To" options={prepareToQuarters()} control={control} />
      <Button type="submit">Get data</Button>
    </>
  );

  function prepareFromQuarters() {
      const index = quarters.findIndex(quarter => quarter.value === tidToValue);
      return quarters.map((quarter, i) => ({
        ...quarter,
        disabled: index < i
      }))
  }

  function prepareToQuarters() {
    const index = quarters.findIndex(quarter => quarter.value === tidFromValue);
    return quarters.map((quarter, i) => ({
      ...quarter,
      disabled: index > i
    }))
  }
};

export default ViewMainForm;