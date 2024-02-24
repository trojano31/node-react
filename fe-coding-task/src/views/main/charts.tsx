import { Alert, CircularProgress } from '@mui/material';
import { IHousingQueryParams } from '../../types/housingQuery';

interface IViewMainCharts {
  isLoading: boolean;
  data: object[];
  error: string;
  currentParams: IHousingQueryParams
}

const ViewMainCharts = ({ data, isLoading, error }: IViewMainCharts) => {
  if (isLoading) {
    return <CircularProgress />;
  }
console.log(data)
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>

    </div>
  );
};

export default ViewMainCharts;