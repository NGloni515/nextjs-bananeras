import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listInsecticides(params: Params) {
  return axios.get('/box-brand/insecticide', { params });
}

export function useInsecticides({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['insecticides', search, page, limit],
    () => listInsecticides({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}