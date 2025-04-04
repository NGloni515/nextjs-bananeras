import { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { serializeQueryResult } from '@/utils/serializeQueryResult';
import { ExportResponse } from '../../types/export.response';

export const getExport = ({
  exportId,
}: {
  exportId: string;
}): Promise<AxiosResponse> => {
  return axios.get(`/export/${exportId}`);
};

type QueryFnType = typeof getExport;

type UseExportOptions = {
  exportId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useExport = ({
  exportId,
}: UseExportOptions): UseQueryResult<ExportResponse> => {
  const result = useQuery(['export', exportId], () => getExport({ exportId }), {
    keepPreviousData: true,
  });

  return serializeQueryResult(result) as UseQueryResult<ExportResponse>;
};
