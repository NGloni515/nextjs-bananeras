import { useQuery, UseQueryResult } from 'react-query';
import axios from '@/lib/axios';
import { ExporterMaterialStock } from '../../types/winery/exporterMaterialStock';

export const getExporterMaterialStock = async ({
  exporterId,
  materialType,
  materialId,
}: {
  exporterId: number;
  materialType: string;
  materialId: number;
}): Promise<ExporterMaterialStock> => {
  const { data } = await axios.get(
    `/exporter-material-stock/by-exporter-and-material`,
    {
      params: {
        exporterId,
        materialType,
        materialId,
      },
    }
  );
  return data;
};

export const useExporterMaterialStock = ({
  exporterId,
  materialType,
  materialId,
}: {
  exporterId: number;
  materialType: string;
  materialId: number;
}): UseQueryResult<ExporterMaterialStock, unknown> => {
  return useQuery(
    ['exporterMaterialStock', exporterId, materialType, materialId],
    () => getExporterMaterialStock({ exporterId, materialType, materialId }),
    { enabled: !!exporterId && !!materialType && !!materialId }
  );
};
