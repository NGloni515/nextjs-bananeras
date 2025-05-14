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
import IsOnboarding from '../../../../components/ui/IsOnboarding';
import StockMovementsSelector from '../../../../components/winery/StockMovementsSelector';

function StockMovementsPage(): React.JSX.Element {
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
          <CardHeader
            w={'100%'}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Heading>Movimientos de Materiales por Finca</Heading>
          </CardHeader>
          <CardBody w='100%'>
            <StockMovementsSelector />
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
}

export default IsOnboarding(StockMovementsPage);
