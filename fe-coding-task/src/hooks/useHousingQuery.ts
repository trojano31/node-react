import { useState, useEffect } from 'react';
import axios from 'axios';
import { IHousingQueryParams } from '../types/housingQuery';

const API_URL = 'https://data.ssb.no/api/v0/no/table/07241';

export const useHousingQuery = (params: IHousingQueryParams) => {
  const [data, setData] = useState([]);
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
    setData([]);

    const { data, error } = await makeRequest({
      params: {
        query: [
          {
            'code': 'Boligtype',
            'selection': {
              'filter': 'item',
              'values': [params.Boligtype]
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
              'values': params.Tid
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
      setData(data);
    }
    setIsLoading(false);
  }
};

async function makeRequest({ params }: { params: any }) { // type to be made
  const response = await axios.post(API_URL, params);
  if (response.status === 200) {
    return { data: response.data.value, error: '' };
  }
  return { data: [], error: 'Something went wrong' };
}