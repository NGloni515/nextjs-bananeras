import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listStrippings(params: Params) {
  return axios.get('/box-brand/stripping', { params });
}

export function useStrippings({ search = '', page = 1, limit = 10 }: Params) {
  const result = useQuery(
    ['strippings', search, page, limit],
    () => listStrippings({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
