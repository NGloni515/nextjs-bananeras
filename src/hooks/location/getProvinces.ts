import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type ProvinceResponse = {
    id: number;
    name: string;
    code: string;
}[];

export function useProvinces(countryId?: number): {
    data: ProvinceResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    refetch: () => void;
} {
    const result: UseQueryResult<AxiosResponse<ProvinceResponse>> = useQuery(
        ['provinces', countryId],
        () => axios.get(`/location/provinces/${countryId}`),
        {
            enabled: !!countryId,
        }
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
