import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ExportType } from '@/types/export';

type updateExportDTO = {
  data: Partial<ExportType>;
  exportId: string;
};

const updateExport = ({ data, exportId }: updateExportDTO) => {
  return axios.post(`/export/${exportId}`, data);
};

type UseUpdateExportOptions = {
  config?: MutationConfig<typeof updateExport>;
};

export const useUpdateExport = ({ config }: UseUpdateExportOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateExport,
  });

  return { ...mutation, updateExport: mutation.mutateAsync };
};