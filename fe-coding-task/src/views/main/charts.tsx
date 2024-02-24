import { Alert, CircularProgress, Stack, Switch, Typography } from '@mui/material';
import { IHousingQueryParams } from '../../types/housingQuery';
import { useState } from 'react';
import { BarChart, LineChart } from '@mui/x-charts';

interface IViewMainCharts {
  isLoading: boolean;
  data?: number[];
  error: string;
  currentParams: IHousingQueryParams;
}

interface IChartTypes {
  LINE: string,
  BAR: string
}

const ChartTypes: IChartTypes = {
  LINE: 'LINE',
  BAR: 'BAR'
};

const ViewMainCharts = ({ data, isLoading, currentParams, error }: IViewMainCharts) => {
  const [chartType, setChartType] = useState(ChartTypes.LINE);
  if (isLoading) {
    return <CircularProgress />;
  }
  console.log(data);
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }


  return (
    <div>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Line</Typography>
        <Switch checked={chartType === ChartTypes.BAR} onChange={handleSwitchChange} inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>Bar</Typography>
      </Stack>
      {chartType === ChartTypes.LINE && (
        <LineChart
          xAxis={[{ data: currentParams.Tid, scaleType: 'point' }]}
          series={[
            {
              data,
            },
          ]}
          width={500}
          height={300}
        />
      )}
      {chartType === ChartTypes.BAR && (
        <BarChart
          xAxis={[{ scaleType: 'band', data: currentParams.Tid }]}
          series={[{ data }]}
          width={500}
          height={300}
        />
      )}
    </div>
  );

  function handleSwitchChange() {
    if(chartType === ChartTypes.BAR) {
      setChartType(ChartTypes.LINE)
    } else {
      setChartType(ChartTypes.BAR)
    }
  }
};

export default ViewMainCharts;