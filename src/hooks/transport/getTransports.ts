import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axios from '@/lib/axios';
import { PaginationParams } from '@/types/paginationParams';
import { serializeQueryResult } from '@/utils/serializeQueryResult';
import { TransportResponse } from '../../types/transport/transport.response';

type Params = PaginationParams;

function listTransports(params: Params): Promise<AxiosResponse<TransportResponse[]>> {
    return axios
        .get('/transport', { params })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            if (error.response?.status === 404) {
                return {
                    data: [],
                    status: 404,
                    statusText: 'Not Found',
                    headers: {},
                    config: error.config,
                } as AxiosResponse;
            }
            throw error;
        });
}

export function useTransports({ search = '', page = 1, limit = 10 }: Params): ReturnType<typeof serializeQueryResult> {
    const result = useQuery(
        ['transports', search, page, limit],
        () => listTransports({ search, page, limit }),
        {
            keepPreviousData: true,
        }
    );

    return serializeQueryResult(result);
}
