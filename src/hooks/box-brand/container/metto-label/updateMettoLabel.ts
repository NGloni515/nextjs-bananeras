import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { MettoLabelType } from '@/types/box-brand/container/mettoLabel';

type updateMettoLabelDTO = {
  data: Partial<MettoLabelType>;
  mettoLabelId: string;
};

const updateMettoLabel = ({ data, mettoLabelId }: updateMettoLabelDTO) => {
  return axios.post(`/box-brand/metto-label/${mettoLabelId}`, data);
};

type UseUpdateMettoLabelOptions = {
  config?: MutationConfig<typeof updateMettoLabel>;
};

export const useUpdateMettoLabel = ({
  config,
}: UseUpdateMettoLabelOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateMettoLabel,
  });

  return { ...mutation, updateMettoLabel: mutation.mutateAsync };
};
