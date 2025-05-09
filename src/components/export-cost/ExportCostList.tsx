import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ExportCostCard from './ExportCostCard';
import { useExportSentCostsPending } from '../../hooks/export/export-sent/getExportSentCostsPending';
import { usePagination } from '../../hooks/usePagination';
import { ExportSentType } from '../../types/exportSent';

const ExportCostList = (): React.JSX.Element => {
  const { paginationParams } = usePagination();
  const {
    data = [],
    isLoading,
    error,
  } = useExportSentCostsPending(paginationParams);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (error && (error as AxiosError).isAxiosError) {
      const { response } = error as AxiosError<{
        statusCode: number;
      }>;

      const statusCode = response?.data?.statusCode;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <Box mx={'auto'} my={'200px'}>
        <Center>
          <Heading>Cargando...</Heading>
        </Center>
      </Box>
    );
  }

  if (error && (error as AxiosError).isAxiosError) {
    const { response } = error as AxiosError<{
      statusCode: number;
      message: string;
      error: string;
    }>;

    const dataRes = response?.data;

    return (
      <Box mx={'auto'} my={'200px'}>
        <Center>
          <VStack spacing={2} align='center'>
            <Heading>
              {dataRes?.statusCode} - {dataRes?.error}
            </Heading>
            <Text>{dataRes?.message}</Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <>
      <VStack spacing={4} alignItems='center' justifyContent='center'>
        <Heading width='100%' textAlign='center'>
          Lista de Costos de Exportación Pendientes
        </Heading>
        {data.length === 0 ? (
          <Center p={6}>
            <Text>No existen costos de exportación pendientes</Text>
          </Center>
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
            spacing={4}
          >
            {(data as Partial<ExportSentType>[]).map((item) => (
              <ExportCostCard
                key={item.id}
                exportSentItem={item}
                pathname={pathname}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </>
  );
};

export default ExportCostList;
