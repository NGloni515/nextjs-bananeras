/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Badge,
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ExportCard from './ExportCard';
import { useExportsPending } from '../../hooks/export/getExportsPending';
import { usePagination } from '../../hooks/usePagination';
import { ExportType } from '../../types/export';

type ApiErrorData = {
  statusCode?: number;
  message?: string;
  error?: string;
};

const ExportList = (): React.JSX.Element => {
  const { paginationParams } = usePagination();
  const { data = [], isLoading, error } = useExportsPending(paginationParams);
  const router = useRouter();
  const pathname = usePathname();

  const headingColor = useColorModeValue('gray.900', 'gray.100');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  useEffect(() => {
    if (error && isAxiosError<ApiErrorData>(error)) {
      const statusCode = error.response?.data?.statusCode;
      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <Box minH="40vh" display="flex" alignItems="center" justifyContent="center">
        <Heading>Cargando...</Heading>
      </Box>
    );
  }

  if (error) {
    if (isAxiosError<ApiErrorData>(error)) {
      const { statusCode, message, error: errorTitle } = error.response?.data ?? {};
      return (
        <Box minH="40vh" display="flex" alignItems="center" justifyContent="center">
          <VStack spacing={2} align="center">
            <Heading>
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
          <Heading>Error</Heading>
          <Text color={textColor}>Ocurrió un error inesperado</Text>
        </VStack>
      </Box>
    );
  }

  const items = data as Partial<ExportType>[];

  return (
    <VStack spacing={4} align="stretch">
      <Box
        display="flex"
        alignItems="center"
        gap={3}
        justifyContent="space-between"
        w="100%"
      >
        <Heading size="md" color={headingColor}>
          Exportaciones Pendientes
        </Heading>
        <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
          {items.length} {items.length === 1 ? 'pendiente' : 'pendientes'}
        </Badge>
      </Box>

      {items.length === 0 ? (
        <Center py={10}>
          <VStack spacing={1}>
            <Heading size="sm" color={headingColor}>
              No existen exportaciones pendientes
            </Heading>
            <Text fontSize="sm" color={textColor}>
              Cuando existan, aparecerán aquí.
            </Text>
          </VStack>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 6 }}>
          {items.map((item) => (
            <ExportCard key={item.id} exportItem={item} pathname={pathname} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default ExportList;
