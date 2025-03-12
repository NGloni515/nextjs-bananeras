import { Box, Card, CardBody, CardHeader, Center, Heading } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import SentMaterialsExportForm from '../../../../../components/export/SentMaterialsExportForm';
import { fetchExport } from '../../../../../lib/export/export';

interface PageProps {
  params: { id: string };
}

export default async function PendingExportPage({ params }: PageProps): Promise<JSX.Element> {
  const exportData = await fetchExport(params.id);
  
  if (!exportData || !exportData.pendingExportSent) {
    redirect('/dashboard/liquidation/add-supply-shipment');
  }

  return (
    <Box my={'20px'} mx='auto' w={'95%'}>
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
            <Heading>Envío de Insumos</Heading>
          </CardHeader>
          <CardBody w={'100%'}>
            <SentMaterialsExportForm
              exportSelected={exportData}
            />
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
};

