import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listExportsSentPending(params: Params) {
  return axios.get('/export/export-sent/pending', { params });
}

export function useExportsSentPending({
  search = '',
  page = 1,
  limit = 10,
}: Params) {
  const result = useQuery(
    ['exportsSentPending', search, page, limit],
    () => listExportsSentPending({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}