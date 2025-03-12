import { Box, Card, CardBody, CardHeader, Center, Heading } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import PendingPaymentForm from '../../../../../components/export/export-payments/PendingPaymentForm';
import { fetchExport } from '../../../../../lib/export/export';

interface PageProps {
  params: { id: string };
}

export default async function  ExportPaymentPage({ params }: PageProps): Promise<JSX.Element> {
  const exportData = await fetchExport(params.id, true);
  
  if ( !exportData ) {
    redirect('/dashboard/liquidation/producer-pending-payments');
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
            <Heading>Pago a Productores</Heading>
          </CardHeader>
          <CardBody w='100%'>
            <PendingPaymentForm
              paymentSelected={exportData}
            />
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
}
