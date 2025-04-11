/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
} from '@chakra-ui/react';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect } from 'react';
import ClientPendingPaymentForm from '../../../../../components/client-payment/ClientPendingPaymentForm';
import IsOnboarding from '../../../../../components/ui/IsOnboarding';
import { useExportSent } from '../../../../../hooks/export/export-sent/getExportSent';
import { ExportSentType } from '../../../../../types/exportSent';

function ClientPaymentPage(): React.JSX.Element {
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useExportSent({
    exportSentId: params.id,
  });
  const pendingClientPayment = data as Partial<ExportSentType>;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data: dataRes } = response;
      const { statusCode } = dataRes;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
  }, [error, router]);

  useLayoutEffect(() => {
    if (!isLoading) {
      if (!pendingClientPayment || pendingClientPayment.pendingClientPayment) {
        return redirect(pathname.replace(/\/\d+$/, ''));
      }
    }
  }, [isLoading, pendingClientPayment, pathname]);

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
            <Heading>Cobro a Clientes</Heading>
          </CardHeader>
          <CardBody w='100%'>
            <ClientPendingPaymentForm
              paymentSelected={pendingClientPayment}
              pathname={pathname}
            />
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
}

export default IsOnboarding(ClientPaymentPage);
