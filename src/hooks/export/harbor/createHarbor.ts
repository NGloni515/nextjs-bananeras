import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import axios from '@/lib/axios';
import { ServerErrorResponse } from '../../../types/errorResponse';
import { HarborType } from '../../../types/harbor';

interface CreateHarborResponse {
  harborId: string;
}

export const createHarbor = (
  data: Partial<HarborType>
): Promise<CreateHarborResponse> => {
  return axios.post('/harbor', data);
};

export const useCreateHarbor = (
  config?: UseMutationOptions<
    CreateHarborResponse,
    AxiosError<ServerErrorResponse>,
    Partial<HarborType>
  >
): UseMutationResult<
  CreateHarborResponse,
  AxiosError<ServerErrorResponse>,
  Partial<HarborType>
> => {
  return useMutation(createHarbor, config);
};
