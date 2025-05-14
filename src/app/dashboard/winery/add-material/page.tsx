'use client';

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';
import IsOnboarding from '../../../../components/ui/IsOnboarding';
import ImportExporterStockDrawer from '../../../../components/winery/ImportExporterStockDrawer';
import { MaterialList } from '../../../../components/winery/MaterialList';

function AddMaterialPage(): React.JSX.Element {
  return (
    <Formik
      initialValues={{ 'import-exporter-stock': null }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
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
                <Heading>Agregar Stock de Materiales</Heading>
                <ImportExporterStockDrawer />
              </CardHeader>
              <CardBody w='100%'>
                <MaterialList />
              </CardBody>
            </Card>
          </Center>
        </Box>
      )}
    </Formik>
  );
}

export default IsOnboarding(AddMaterialPage);
