import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IHousingQueryFormParams } from '../types/housingQuery';
import { Box, Container } from '@mui/material';
import { useHousingQuery } from './../hooks/useHousingQuery';
import ViewMainForm from './main/form.tsx';
import ViewMainCharts from './main/charts.tsx';
import { getHousingTypes, getQuarters } from '../helpers/getSelectData.ts';
import { useSearchParams } from 'react-router-dom';
import ViewMainHistory from './main/history.tsx';
import { useLocalStorage } from 'usehooks-ts';

function ViewMain() {
  const housingTypes = useMemo(getHousingTypes, []);
  const quarters = useMemo(getQuarters, []);
  const [history, setHistory] = useLocalStorage<IHousingQueryFormParams[]>('history', []);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValues: IHousingQueryFormParams = getDefaultValues();
  const [currentParams, setCurrentParams] = useState(defaultValues);
  const {
    handleSubmit,
    control,
    watch,
    reset
  } = useForm<IHousingQueryFormParams>({ defaultValues });
  const { isLoading, data, error } = useHousingQuery(currentParams, quarters);
  const tidFromValue = watch('TidFrom');
  const tidToValue = watch('TidTo');

  return (
    <Container maxWidth="md">
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: '2rem', gap: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <ViewMainForm
              tidToValue={tidToValue}
              tidFromValue={tidFromValue}
              quarters={quarters}
              control={control}
              housingTypes={housingTypes}
            />
          </Box>
        </form>
        <ViewMainHistory history={history} onSelect={handleHistorySelect} handleHistorySave={handleHistorySave} />
        <ViewMainCharts data={data} isLoading={isLoading} error={error} />
      </Box>
    </Container>
  );

  function handleHistorySelect(data: IHousingQueryFormParams) {
    reset(data)
    onSubmit(data)
  }

  function handleHistorySave() {
    setHistory([...history, currentParams]);
  }

  function onSubmit(data: IHousingQueryFormParams) {
    setCurrentParams(data);
    saveDataToUrl(data);
  }

  function getDefaultValues() {
    return {
      Boligtype: searchParams.get('Boligtype') || housingTypes[0].value,
      TidFrom: searchParams.get('TidFrom') || quarters[0].value,
      TidTo: searchParams.get('TidTo') || quarters[5].value
    };
  }

  function saveDataToUrl(data: IHousingQueryFormParams) {
    const paramsObject: Record<string, string> = {
      Boligtype: data.Boligtype,
      TidFrom: data.TidFrom,
      TidTo: data.TidTo,
    };
    const params = new URLSearchParams(paramsObject);
    setSearchParams(params);
  }
}

export default ViewMain;
