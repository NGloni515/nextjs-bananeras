import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import axios from '@/lib/axios';
import { ServerErrorResponse } from '../../../types/errorResponse';
import { ShippingCompanyType } from '../../../types/shippingCompany.create';

interface CreateShippingCompanyResponse {
  shippingCompanyId: string;
}

export const createShippingCompany = (
  data: Partial<ShippingCompanyType>
): Promise<CreateShippingCompanyResponse> => {
  return axios.post('harbor/shipping-company', data);
};

export const useCreateShippingCompany = (
  config?: UseMutationOptions<
    CreateShippingCompanyResponse,
    AxiosError<ServerErrorResponse>,
    Partial<ShippingCompanyType>
  >
): UseMutationResult<
  CreateShippingCompanyResponse,
  AxiosError<ServerErrorResponse>,
  Partial<ShippingCompanyType>
> => {
  return useMutation(createShippingCompany, config);
};
