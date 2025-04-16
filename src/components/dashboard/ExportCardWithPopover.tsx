'use client';

import {
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import React from 'react';
import { ExportResponse } from '@/types/export.response';

interface ExportCardWithPopoverProps {
  exportData: ExportResponse;
  color: string;
  dailyQuantity: number;
}

export default function ExportCardWithPopover({
  exportData,
  color,
  dailyQuantity,
}: ExportCardWithPopoverProps): React.JSX.Element {
  return (
    <Popover placement='auto' trigger='click'>
      <PopoverTrigger>
        <Box
          mb={2}
          p={2}
          borderRadius='md'
          bg={color}
          color='white'
          fontSize='sm'
          boxShadow='md'
          cursor='pointer'
        >
          <Text fontWeight='bold'>{dailyQuantity} cajas</Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent minW='400px' borderColor={color} borderWidth='4px'>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <strong>Detalle de Exportación</strong>
        </PopoverHeader>
        <PopoverBody>
          <Text>
            <strong>Cut-Off:</strong>{' '}
            {exportData.cutOffTime ?? 'Sin hora asignada'}
          </Text>
          <Text>
            <strong>Productor:</strong>{' '}
            {exportData.merchant?.businessName ?? 'Sin productor'}
          </Text>
          <Text>
            <strong>Finca:</strong> {exportData.business?.name ?? 'Sin finca'}
          </Text>
          <Text>
            <strong>Marca:</strong> {exportData.boxBrand?.name ?? 'Sin marca'}
            {' - '}
            {exportData.boxBrand?.brand.name ?? 'Sin marca'}
          </Text>
          <Text>
            <strong>Cliente:</strong>{' '}
            {exportData.client?.businessName ?? 'Sin cliente'}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
