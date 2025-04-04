import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import axios from '@/lib/axios';
import { ServerErrorResponse } from '@/types/errorResponse';
import { MerchantType } from '@/types/merchant/merchant';

export interface CreateOnboardingResponse {
  merchantId: string;
}

export const createOnboarding = (
  data: Partial<MerchantType>
): Promise<CreateOnboardingResponse> => {
  return axios.post('/auth/exporter/onboarding', data);
};

export const useCreateOnboarding = (
  config?: UseMutationOptions<
    CreateOnboardingResponse,
    AxiosError<ServerErrorResponse>,
    Partial<MerchantType>
  >
): UseMutationResult<
  CreateOnboardingResponse,
  AxiosError<ServerErrorResponse>,
  Partial<MerchantType>
> => {
  return useMutation(createOnboarding, config);
};