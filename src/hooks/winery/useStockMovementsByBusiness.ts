import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { ExporterBusinessMaterialStock } from '../../types/winery/exporterBusinessMaterialStock';

export const useStockMovementsByBusiness = (
  businessId: number | null
): UseQueryResult<ExporterBusinessMaterialStock[], unknown> => {
  return useQuery<ExporterBusinessMaterialStock[], unknown>(
    ['stockMovements', businessId],
    async () => {
      const { data } = await axios.get(
        `/exporter-material-stock/business/${businessId}`
      );
      return data;
    },
    {
      enabled: !!businessId,
    }
  );
};
