import { Box, Card, CardBody, CardHeader, Center, Heading } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import CuttingSheetForm from '../../../../../components/export/cutting-sheet/CuttingSheetForm';
import { fetchExport } from '../../../../../lib/export/export';

interface PageProps {
  params: { id: string };
}

export default async function CuttingSheetPage({ params }: PageProps): Promise<JSX.Element> {
  const exportData = await fetchExport(params.id);
  
  if (!exportData) {
    redirect('/dashboard/export/add-cutting-sheet');
  }

  return (
    <Box my='20px' mx='auto' w='95%'>
      <Center>
        <Card
          w={{
            base: '95%',
            sm: '95%',
            md: '90%',
            lg: '100%',
            xl: '100%',
          }}
          mb="20px"
        >
          <CardHeader w="100%">
            <Heading textAlign="center">Hoja de Corte</Heading>
          </CardHeader>
          <CardBody w={'100%'}>
            <CuttingSheetForm
              cuttingSheetSelected={exportData}
            />
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
}
