import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type SpotPriceResponse = {
  id: number;
  date: string;
  price: string;
}[];

export function useSpotPrices(): {
  data: SpotPriceResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
} {
  const result: UseQueryResult<AxiosResponse<SpotPriceResponse>> = useQuery(
    ['spotPrices'],
    () => axios.get(`/spot-prices`)
  );

  const serialized = serializeQueryResult(result);

  return {
    data: serialized.data,
    isLoading: serialized.isLoading,
    isError: serialized.isError,
    error: serialized.error,
    refetch: serialized.refetch,
  };
}
