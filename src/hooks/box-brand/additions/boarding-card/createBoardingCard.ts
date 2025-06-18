import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import axios from '@/lib/axios';
import { BoardingCardType } from '../../../../types/box-brand/additions/boardingCard';
import { ServerErrorResponse } from '../../../../types/errorResponse';

interface CreateBoardingCardResponse {
  boardingCardId: string;
}

export const createBoardingCard = (
  data: Partial<BoardingCardType>
): Promise<CreateBoardingCardResponse> => {
  return axios.post('/box-brand/boarding-card', data);
};

export const useCreateBoardingCard = (
  config?: UseMutationOptions<
    CreateBoardingCardResponse,
    AxiosError<ServerErrorResponse>,
    Partial<BoardingCardType>
  >
): UseMutationResult<
  CreateBoardingCardResponse,
  AxiosError<ServerErrorResponse>,
  Partial<BoardingCardType>
> => {
  return useMutation(createBoardingCard, config);
};
