import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import axios from '@/lib/axios';
import { DepositType } from '../../types/deposit/deposit';
import { ServerErrorResponse } from '../../types/errorResponse';

interface CreateDepositResponse {
    depositId: string;
}

export const createDeposit = (
    data: Partial<DepositType>
): Promise<CreateDepositResponse> => {
    return axios.post('/deposit', data);
};

export const useCreateDeposit = (
    config?: UseMutationOptions<
        CreateDepositResponse,
        AxiosError<ServerErrorResponse>,
        Partial<DepositType>
    >
): UseMutationResult<
    CreateDepositResponse,
    AxiosError<ServerErrorResponse>,
    Partial<DepositType>
> => {
    return useMutation(createDeposit, config);
};
