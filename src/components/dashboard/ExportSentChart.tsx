'use client';

import { Box, Text } from '@chakra-ui/react';
import { parseISO } from 'date-fns';
import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useExportsSent } from '../../hooks/export/getExportSents';

interface ExportSent {
  id: number;
  export: {
    id: number;
    boxBrand: {
      id: number;
      name: string;
    };
    merchantId: number;
    clientId: number;
    cuttingDate: string;
  };
  producerPayment?: {
    merchantId: number;
    boxQuantity: number;
  } | null;
  clientPayment?: {
    clientId: number;
    boxQuantity: number;
  } | null;
}

interface ChartData {
  groupKey: string;
  label: string;
  producerTotal: number;
  clientTotal: number;
}

interface ExportSentChartProps {
  weekStart: Date;
  weekEnd: Date;
}

export function ExportSentChart({
  weekStart,
  weekEnd,
}: ExportSentChartProps): React.JSX.Element {
  const {
    data: sentData,
    isLoading,
    isError,
  } = useExportsSent({
    search: '',
    page: 1,
    limit: 100,
  });

  const filteredSentData: ExportSent[] = useMemo(() => {
    return sentData.filter((sent: ExportSent) => {
      if (!sent.export?.cuttingDate) return false;
      try {
        const date = parseISO(sent.export.cuttingDate);
        return date >= weekStart && date <= weekEnd;
      } catch (error) {
        return false;
      }
    });
  }, [sentData, weekStart, weekEnd]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  if (isError || !sentData) {
    return <div>Error al cargar los datos</div>;
  }

  if (filteredSentData.length === 0) {
    return (
      <Box p={4}>
        <Text fontSize='xl' fontWeight='bold'>
          Aún no se han incluido exportaciones para la semana seleccionada.
        </Text>
      </Box>
    );
  }

  const groupedData: { [key: string]: ChartData } = {};

  filteredSentData.forEach((item: ExportSent) => {
    const boxBrand = item.export.boxBrand;
    const merchantId = item.export?.merchantId ?? 'sinProd';
    const clientId = item.export?.clientId ?? 'sinCli';

    const groupKey = `${boxBrand.id}_${merchantId}_${clientId}`;

    if (!groupedData[groupKey]) {
      groupedData[groupKey] = {
        groupKey,
        label: `${boxBrand.name} (Prod: ${merchantId} - Cli: ${clientId})`,
        producerTotal: 0,
        clientTotal: 0,
      };
    }

    if (item.producerPayment) {
      groupedData[groupKey].producerTotal += Number(
        item.producerPayment.boxQuantity
      );
    }
    if (item.clientPayment) {
      groupedData[groupKey].clientTotal += Number(
        item.clientPayment.boxQuantity
      );
    }
  });

  const chartData: ChartData[] = Object.values(groupedData);

  return (
    <Box width='100%' height='400px'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id='gradientCliente' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#5aca74' stopOpacity={0.8} />
              <stop offset='100%' stopColor='#5aca74' stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id='gradientProductor' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#755ebc' stopOpacity={0.8} />
              <stop offset='100%' stopColor='#755ebc' stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='label' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey='clientTotal'
            name='Cliente'
            fill='url(#gradientCliente)'
          />
          <Bar
            dataKey='producerTotal'
            name='Productor'
            fill='url(#gradientProductor)'
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
