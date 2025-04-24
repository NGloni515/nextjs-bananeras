'use client';
import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import PendingPaymentList from '../../../../components/client-payment/ClientPendingPaymentList';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function ClientPaymentsPage(): React.JSX.Element {
  return (
    <Box my={'20px'} mx={'auto'}>
      <Center>
        <PendingPaymentList />
      </Center>
    </Box>
  );
}

export default IsOnboarding(ClientPaymentsPage);
