/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useMemo, useState } from 'react';
import './main/main.css';
import { useForm } from 'react-hook-form';
import { IHousingQueryFormParams, IHousingQueryParams } from '../types/housingQuery';
import { Box, Container } from '@mui/material';
import { useHousingQuery } from './../hooks/useHousingQuery';
import ViewMainForm from './main/form.tsx';
import ViewMainCharts from './main/charts.tsx';

function ViewMain() {
  const housingTypes = useMemo(getHousingTypes, []);
  const quarters = useMemo(getQuarters, []);
  const defaultValues: IHousingQueryFormParams = { Boligtype: housingTypes[0].value, TidFrom: quarters[0].value, TidTo: quarters[1].value };
  const [currentParams, setCurrentParams] = useState(prepareParams(defaultValues));
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm<IHousingQueryFormParams>({ defaultValues });
  const { isLoading, data, error } = useHousingQuery(currentParams);
  const tidFromValue = watch('TidFrom');
  const tidToValue = watch('TidTo');
  return (
    <div css={css`
      margin-top: 3rem
    `}>
      <Container maxWidth="md">
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div css={css`
              display: flex;
              gap: 1rem;
            `}>
              <ViewMainForm tidToValue={tidToValue} tidFromValue={tidFromValue} quarters={quarters} control={control} housingTypes={housingTypes} />
            </div>
          </form>
          <ViewMainCharts data={data} currentParams={currentParams} isLoading={isLoading} error={error} />
        </Box>
      </Container>
    </div>
  );

  function getHousingTypes() {
    return [{
      text: 'Boliger i alt',
      value: '00'
    }, {
      text: 'Småhus',
      value: '02'
    }, {
      text: 'Blokkleiligheter',
      value: '03'
    }];
  }

  function getQuarters() {
    return ['2009K1',
      '2009K2',
      '2009K3',
      '2009K4',
      '2010K1',
      '2010K2',
      '2010K3',
      '2010K4',
      '2011K1',
      '2011K2',
      '2011K3',
      '2011K4',
      '2012K1',
      '2012K2',
      '2012K3',
      '2012K4',
      '2013K1',
      '2013K2',
      '2013K3',
      '2013K4',
      '2014K1',
      '2014K2',
      '2014K3',
      '2014K4',
      '2015K1',
      '2015K2',
      '2015K3',
      '2015K4',
      '2016K1',
      '2016K2',
      '2016K3',
      '2016K4',
      '2017K1',
      '2017K2',
      '2017K3',
      '2017K4',
      '2018K1',
      '2018K2',
      '2018K3',
      '2018K4',
      '2019K1',
      '2019K2',
      '2019K3',
      '2019K4',
      '2020K1',
      '2020K2',
      '2020K3',
      '2020K4',
      '2021K1',
      '2021K2',
      '2021K3',
      '2021K4',
      '2022K1',
      '2022K2',
      '2022K3',
      '2022K4',
      '2023K1',
      '2023K2',
      '2023K3',
      '2023K4'].map(i => ({ text: i, value: i }));
  }

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
