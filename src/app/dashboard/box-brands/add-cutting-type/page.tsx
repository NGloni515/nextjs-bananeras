'use client';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
} from '@chakra-ui/react';
import AddCuttingTypeForm from '../../../../components/export/cutting-type/AddCuttingTypeForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function AddCuttingTypePage() {
  return (
    <>
      <Box my={'20px'} mx={'auto'} w={'80%'}>
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
              <Heading>Agregar Tipo de Corte</Heading>
            </CardHeader>
            <CardBody w='100%'>
              <AddCuttingTypeForm />
            </CardBody>
          </Card>
        </Center>
      </Box>
    </>
  );
}

export default IsOnboarding(AddCuttingTypePage);