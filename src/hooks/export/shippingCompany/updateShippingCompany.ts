import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ShippingCompanyType } from '@/types/shippingCompany';

type updateShippingCompanyDTO = {
  data: Partial<ShippingCompanyType>;
  shippingCompanyId: string;
};

const updateShippingCompany = ({
  data,
  shippingCompanyId,
}: updateShippingCompanyDTO) => {
  return axios.post(`/harbor/shipping-company/${shippingCompanyId}`, data);
};

type UseUpdateShippingCompanyOptions = {
  config?: MutationConfig<typeof updateShippingCompany>;
};

export const useUpdateShippingCompany = ({
  config,
}: UseUpdateShippingCompanyOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateShippingCompany,
  });

  return { ...mutation, updateShippingCompany: mutation.mutateAsync };
};