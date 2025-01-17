'use client';
import { Box, Card, CardBody, Center, Heading } from '@chakra-ui/react';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect } from 'react';
import PendingPaymentForm from '../../../../../components/export/export-payments/PendingPaymentForm';
import IsOnboarding from '../../../../../components/ui/IsOnboarding';
import { useExportSent } from '../../../../../hooks/export/export-sent/getExportSent';
import { ExportSentType } from '../../../../../types/exportSent';

function ExportPaymentPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, refetch, error } = useExportSent({
    exportSentId: params.id,
  });
  const pendingPayment = data as Partial<ExportSentType>;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data: dataRes } = response;
      const { statusCode, message, error: errorTitle, model, prop } = dataRes;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useLayoutEffect(() => {
    if (!isLoading) {
      if (!pendingPayment || !pendingPayment.pendingProducerPayment) {
        return redirect(pathname.replace(/\/\d+$/, ''));
      }
    }
  }, [isLoading, pendingPayment, pathname]);

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
    <Box my={'20px'} mx={'auto'}>
      <Center>
        <Card
          w={{
            base: '95%',
            sm: '95%',
            md: '90%',
            lg: '100%',
            xl: '100%',
            '2xl': '700px',
          }}
          mb={'20px'}
        >
          <CardBody w='100%'>
            <PendingPaymentForm
              paymentSelected={pendingPayment}
              pathname={pathname}
            />
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
}

export default IsOnboarding(ExportPaymentPage);
