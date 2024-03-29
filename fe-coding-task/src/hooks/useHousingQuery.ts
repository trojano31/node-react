import { useState, useEffect } from 'react';
import axios from 'axios';
import { IDataTypes, IHousingQueryFormParams, IHousingQueryParams } from '../types/housingQuery';
import { ISelectOption } from '../types/components';

const API_URL = 'https://data.ssb.no/api/v0/no/table/07241';

export const useHousingQuery = (params: IHousingQueryFormParams, quarters: ISelectOption[]) => {
  const [data, setData] = useState<IDataTypes>({ values: [], labels: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params) fetchQueries();
  }, [JSON.stringify(params)]);

  return {
    data, isLoading, error
  };

  async function fetchQueries() {
    setIsLoading(true);
    setError('');
    setData({ values: [], labels: [] });
    const preparedParams = prepareParams();
    const { values, labels, error } = await makeRequest({
      params: {
        query: [
          {
            'code': 'Boligtype',
            'selection': {
              'filter': 'item',
              'values': [preparedParams.Boligtype]
            }
          },
          {
            'code': 'ContentsCode',
            'selection': {
              'filter': 'item',
              'values': [
                'KvPris'
              ]
            }
          },
          {
            'code': 'Tid',
            'selection': {
              'filter': 'item',
              'values': preparedParams.Tid
            }
          }
        ],
        response: {
          'format': 'json-stat2'
        }
      }
    });
    if (error) {
      setError(error);
    } else {
      setData({ values, labels });
    }
    setIsLoading(false);
  }

  function prepareParams(): IHousingQueryParams {
    const indexFrom = quarters.findIndex(i => i.value === params.TidFrom);
    const indexTo = quarters.findIndex(i => i.value === params.TidTo);
    return {
      Boligtype: params.Boligtype,
      Tid: quarters.slice(indexFrom, indexTo + 1).map(quarter => quarter.value)
    };
  }
};

async function makeRequest({ params }: { params: any }) { // type to be made
  const response = await axios.post(API_URL, params);
  if (response.status === 200) {
    const labels = Object.keys(response.data.dimension.Tid.category.label);
    return { values: response.data.value, labels, error: '' };
  }
  return { values: [], error: 'Something went wrong' };
}