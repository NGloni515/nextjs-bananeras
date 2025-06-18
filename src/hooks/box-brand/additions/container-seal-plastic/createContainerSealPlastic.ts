import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import axios from '@/lib/axios';
import { ContainerSealPlasticType } from '../../../../types/box-brand/additions/containerSealPlastic';
import { ServerErrorResponse } from '../../../../types/errorResponse';

interface CreateContainerSealPlasticResponse {
  containerSealPlasticId: string;
}

export const createContainerSealPlastic = (
  data: Partial<ContainerSealPlasticType>
): Promise<CreateContainerSealPlasticResponse> => {
  return axios.post('/box-brand/container-seal-plastic', data);
};

export const useCreateContainerSealPlastic = (
  config?: UseMutationOptions<
    CreateContainerSealPlasticResponse,
    AxiosError<ServerErrorResponse>,
    Partial<ContainerSealPlasticType>
  >
): UseMutationResult<
  CreateContainerSealPlasticResponse,
  AxiosError<ServerErrorResponse>,
  Partial<ContainerSealPlasticType>
> => {
  return useMutation(createContainerSealPlastic, config);
};
