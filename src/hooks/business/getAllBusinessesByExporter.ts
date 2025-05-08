import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { Business } from '../../types/cuttingSheet.response';

export const useBusinessesByExporter = (
  exporterId: number
): UseQueryResult<Business[], unknown> => {
  return useQuery<Business[], unknown>(
    ['businesses', exporterId],
    async () => {
      const { data } = await axios.get(`/exporter/${exporterId}/business`);
      return data;
    },
    {
      enabled: !!exporterId,
    }
  );
};
