import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BankAccountType } from '@/types/bankAccount';

interface CreateBankAccountResponse {
  bankAccountId: string;
}

export const createBankAccount = (
  data: Partial<BankAccountType>
): Promise<CreateBankAccountResponse> => {
  return axios.post('/bank-account', data);
};

type UseCreateBankAccountOptions = {
  config?: MutationConfig<typeof createBankAccount>;
};

export const useCreateBankAccount = ({
  config,
}: UseCreateBankAccountOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createBankAccount,
  });

  return { ...mutation, createBankAccount: mutation.mutate };
};
