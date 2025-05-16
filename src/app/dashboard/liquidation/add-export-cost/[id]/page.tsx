'use client';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect } from 'react';
import ExportSentCostForm from '../../../../../components/export-cost/ExportSentCostForm';
import IsOnboarding from '../../../../../components/ui/IsOnboarding';
import { useExportSent } from '../../../../../hooks/export/export-sent/getExportSent';
import { ExportSentType } from '../../../../../types/exportSent';

function ExportSentCostPage(): React.JSX.Element {
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useExportSent({
    exportSentId: params.id,
  });
  const pendingProducerCost = data as Partial<ExportSentType>;
  const pathname = usePathname();
  const router = useRouter();

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

  useLayoutEffect(() => {
    if (!isLoading) {
      if (!pendingProducerCost) {
        return redirect(pathname.replace(/\/\d+$/, ''));
      }
    }
  }, [isLoading, pendingProducerCost, pathname]);

  if (isLoading) {
    return (
      <Box mx={'auto'} my={'200px'}>
        <Center>
          <Heading>Cargando...</Heading>
        </Center>
      </Box>
    );
  }

  return (
    <Box my={'20px'} mx={'auto'} w={'95%'}>
      <Center>
        <Card
          w={{
            base: '95%',
            sm: '95%',
            md: '90%',
            lg: '100%',
            xl: '100%',
          }}
          mb={'20px'}
        >
          <CardHeader w={'100%'}>
            <Heading>Validación de Costos</Heading>
          </CardHeader>
          <CardBody w={'100%'}>
            <ExportSentCostForm pathname={pathname} />
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
}

export default IsOnboarding(ExportSentCostPage);
