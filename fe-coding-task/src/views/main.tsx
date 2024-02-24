import { useMemo, useState } from 'react';
import './main/main.css';
import { useForm } from 'react-hook-form';
import { IHousingQueryFormParams, IHousingQueryParams } from '../types/housingQuery';
import { Box, Container } from '@mui/material';
import { useHousingQuery } from './../hooks/useHousingQuery';
import ViewMainForm from './main/form.tsx';
import ViewMainCharts from './main/charts.tsx';
import { getHousingTypes, getQuarters } from '../helpers/getSelectData.ts';

function ViewMain() {
  const housingTypes = useMemo(getHousingTypes, []);
  const quarters = useMemo(getQuarters, []);
  const defaultValues: IHousingQueryFormParams = { Boligtype: housingTypes[0].value, TidFrom: quarters[0].value, TidTo: quarters[5].value };
  const [currentParams, setCurrentParams] = useState(prepareParams(defaultValues));
  const {
    handleSubmit,
    control,
    watch
  } = useForm<IHousingQueryFormParams>({ defaultValues });
  const { isLoading, data, error } = useHousingQuery(currentParams);
  const tidFromValue = watch('TidFrom');
  const tidToValue = watch('TidTo');

  return (
    <Container maxWidth="md">
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <ViewMainForm tidToValue={tidToValue} tidFromValue={tidFromValue} quarters={quarters} control={control} housingTypes={housingTypes} />
          </Box>
        </form>
        <ViewMainCharts data={data} currentParams={currentParams} isLoading={isLoading} error={error} />
      </Box>
    </Container>
  );

  function onSubmit(data: IHousingQueryFormParams) {
    setCurrentParams(prepareParams(data));
  }

  function prepareParams(data: IHousingQueryFormParams): IHousingQueryParams {
    const indexFrom = quarters.findIndex(i => i.value === data.TidFrom);
    const indexTo = quarters.findIndex(i => i.value === data.TidTo);
    return {
      ...data,
      Tid: quarters.slice(indexFrom, indexTo).map(quarter => quarter.value)
    };
  }
}

export default ViewMain;
