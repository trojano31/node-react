import { Alert, CircularProgress, Stack, Switch, Typography } from '@mui/material';
import { IDataTypes, IHousingQueryParams } from '../../types/housingQuery';
import { useState } from 'react';
import { BarChart, LineChart } from '@mui/x-charts';

interface IViewMainCharts {
  isLoading: boolean;
  data?: IDataTypes;
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

const ViewMainCharts = ({ data, isLoading, error }: IViewMainCharts) => {
  const [chartType, setChartType] = useState(ChartTypes.LINE);
  if (isLoading) {
    return <CircularProgress />;
  }
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
          xAxis={[{ data: data?.labels, scaleType: 'point' }]}
          series={[
            {
              data: data?.values,
            },
          ]}
          width={500}
          height={300}
        />
      )}
      {chartType === ChartTypes.BAR && (
        <BarChart
          xAxis={[{ scaleType: 'band', data: data?.labels }]}
          series={[{ data: data?.values }]}
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