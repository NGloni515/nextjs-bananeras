import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type Params = PaginationParams;

function listExportSentCostsPending(params: Params): Promise<AxiosResponse> {
  return axios
    .get('export-sent/pending-costs', { params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response?.status === 404) {
        return {
          data: [],
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: error.config,
        } as AxiosResponse;
      }
      throw error;
    });
}

export function useExportSentCostsPending({
  search = '',
  page = 1,
  limit = 10,
}: Params): ReturnType<typeof serializeQueryResult> {
  const result = useQuery(
    ['exportSentCostsPending', search, page, limit],
    () => listExportSentCostsPending({ search, page, limit }),
    {
      keepPreviousData: true,
    }
  );

  return serializeQueryResult(result);
}
