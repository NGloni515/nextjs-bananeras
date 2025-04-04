'use client';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import AddDepositForm from '../../../../components/deposit/AddDepositForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function AddDepositPage(): React.JSX.Element {
  return (
    <>
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
              <Heading>Agregar Deposito Nuevo</Heading>
            </CardHeader>
            <CardBody w='100%'>
              <AddDepositForm />
            </CardBody>
          </Card>
        </Center>
      </Box>
    </>
  );
}

export default IsOnboarding(AddDepositPage);
