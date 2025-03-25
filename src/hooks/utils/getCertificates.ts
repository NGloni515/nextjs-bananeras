import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { serializeQueryResult } from '@/utils/serializeQueryResult';

type CertificateResponse = {
    id: number;
    name: string;
    certificateCode: string;
}[];

export function useCertificates(): {
    data: CertificateResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    refetch: () => void;
} {
    const result: UseQueryResult<AxiosResponse<CertificateResponse>> = useQuery(
        ['certificates'],
        () => axios.get(`/certificate`),
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
