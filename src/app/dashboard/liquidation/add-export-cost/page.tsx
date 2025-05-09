'use client';
import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import ExportCostList from '../../../../components/export-cost/ExportCostList';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function ExportCostPage(): React.JSX.Element {
  return (
    <Box my={'20px'} mx={'auto'}>
      <Center>
        <ExportCostList />
      </Center>
    </Box>
  );
}

export default IsOnboarding(ExportCostPage);
