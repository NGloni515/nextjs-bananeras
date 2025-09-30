'use client';

import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import ExportCostCard from './ExportCostCard';
import { useExportSentCostsPending } from '../../hooks/export/export-sent/getExportSentCostsPending';
import { usePagination } from '../../hooks/usePagination';
import { ExportSentType } from '../../types/exportSent';

type ApiErrorData = {
  statusCode?: number;
  message?: string;
  error?: string;
};

const ExportCostList = (): React.JSX.Element => {
  const { paginationParams } = usePagination();
  const { data = [], isLoading, error } = useExportSentCostsPending(paginationParams);

  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('exportSentCostsPending');
  }, [queryClient, paginationParams]);

  const headingColor = useColorModeValue('gray.900', 'gray.100');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  useEffect(() => {
    if (error && isAxiosError<ApiErrorData>(error)) {
      const statusCode = error.response?.data?.statusCode;
      if (statusCode === 401) router.push('/api/auth/signout');
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <Box minH="40vh" display="flex" alignItems="center" justifyContent="center">
        <Heading size="md">Cargando...</Heading>
      </Box>
    );
  }

  if (error) {
    if (isAxiosError<ApiErrorData>(error)) {
      const { statusCode, message, error: errorTitle } = error.response?.data ?? {};
      return (
        <Box minH="40vh" display="flex" alignItems="center" justifyContent="center">
          <VStack spacing={2} align="center">
            <Heading size="md">
              {statusCode ?? 'Error'}
              {errorTitle ? ` - ${errorTitle}` : ''}
            </Heading>
            <Text color={textColor}>{message ?? 'Ocurrió un error inesperado'}</Text>
          </VStack>
        </Box>
      );
    }
    return (
      <Box minH="40vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={2} align="center">
          <Heading size="md">Error</Heading>
          <Text color={textColor}>Ocurrió un error inesperado</Text>
        </VStack>
      </Box>
    );
  }

  const items = data as Partial<ExportSentType>[];

  return (
    <VStack spacing={4} align="stretch">
      <Box display="flex" alignItems="center" gap={3} justifyContent="space-between" w="100%">
        <Heading size="md" color={headingColor}>
          Costos de Exportación Pendientes
        </Heading>
        <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
          {items.length} {items.length === 1 ? 'pendiente' : 'pendientes'}
        </Badge>
      </Box>

      {items.length === 0 ? (
        <Center py={10}>
          <VStack spacing={1}>
            <Heading size="sm" color={headingColor}>
              No existen costos de exportación pendientes
            </Heading>
            <Text fontSize="sm" color={textColor}>
              Cuando existan, aparecerán aquí.
            </Text>
          </VStack>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 6 }}>
          {items.map((item) => (
            <ExportCostCard key={item?.id} exportSentItem={item} pathname={pathname} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default ExportCostList;
