import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import axios from '@/lib/axios';
import { SecurityKitType } from '../../../../types/box-brand/additions/securityKit';
import { ServerErrorResponse } from '../../../../types/errorResponse';

interface CreateSecurityKitResponse {
  securityKitId: string;
}

export const createSecurityKit = (
  data: Partial<SecurityKitType>
): Promise<CreateSecurityKitResponse> => {
  return axios.post('/box-brand/security-kit', data);
};

export const useCreateSecurityKit = (
  config?: UseMutationOptions<
    CreateSecurityKitResponse,
    AxiosError<ServerErrorResponse>,
    Partial<SecurityKitType>
  >
): UseMutationResult<
  CreateSecurityKitResponse,
  AxiosError<ServerErrorResponse>,
  Partial<SecurityKitType>
> => {
  return useMutation(createSecurityKit, config);
};
