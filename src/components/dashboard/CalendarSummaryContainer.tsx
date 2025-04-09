'use client';

import { Grid, GridItem, Text, Center, Skeleton } from '@chakra-ui/react';
import {
  startOfWeek,
  endOfWeek,
  parseISO,
  isSameWeek,
  addDays,
  format,
} from 'date-fns';
import { es } from 'date-fns/locale';
import React, { useState, useMemo, useRef } from 'react';
import { ExportResponse } from '@/types/export.response';
import WeeklyExportsCalendar from './WeeklyExportsCalendar';
import WeeklyExportsSummary from './WeeklyExportsSummary';
import { useExports } from '../../hooks/export/getExports';

const colorPalette = [
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#84cc16',
  '#22c55e',
  '#14b8a6',
  '#0ea5e9',
  '#6366f1',
  '#8b5cf6',
  '#d946ef',
];

export default function CalendarSummaryContainer(): JSX.Element {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedProducer, setSelectedProducer] = useState<string>('');
  const [selectedBoxBrand, setSelectedBoxBrand] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');

  const { data, isLoading, isError } = useExports({
    search: '',
    page: 1,
    limit: 100,
  });

  const exportsData = useMemo(
    () => (data ? (data as ExportResponse[]) : []),
    [data]
  );

  const weekStart = useMemo(
    () => startOfWeek(currentDate, { weekStartsOn: 1 }),
    [currentDate]
  );
  const weekEnd = useMemo(
    () => endOfWeek(weekStart, { weekStartsOn: 1 }),
    [weekStart]
  );
  const isCurrentWeek = useMemo(
    () => isSameWeek(currentDate, new Date(), { weekStartsOn: 1 }),
    [currentDate]
  );

  const computedDayLabels = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) =>
      format(addDays(weekStart, i), 'EEEE/dd', { locale: es })
    );
  }, [weekStart]);

  const filteredData = useMemo(() => {
    return exportsData.filter((exp) => {
      const expDate = parseISO(exp.cuttingDate);
      if (expDate < weekStart || expDate > weekEnd) return false;
      if (selectedProducer && exp.merchant?.businessName !== selectedProducer)
        return false;
      if (selectedBoxBrand && exp.boxBrand?.name !== selectedBoxBrand)
        return false;
      if (selectedClient && exp.client?.businessName !== selectedClient)
        return false;
      return true;
    });
  }, [
    exportsData,
    weekStart,
    weekEnd,
    selectedProducer,
    selectedBoxBrand,
    selectedClient,
  ]);

  const boxesMatrix = useMemo(() => {
    const matrix: Record<
      number,
      { exportId: number; boxQuantity: number; exportData: ExportResponse }[]
    > = {};
    for (let i = 0; i < 7; i++) {
      matrix[i] = [];
    }
    filteredData.forEach((exp) => {
      if (exp.weekBoxesOfDay) {
        exp.weekBoxesOfDay.forEach((quantity, dayIndex) => {
          if (quantity > 0) {
            matrix[dayIndex].push({
              exportId: exp.id,
              boxQuantity: quantity,
              exportData: exp,
            });
          }
        });
      }
    });
    return matrix;
  }, [filteredData]);

  const exportColorMap = useRef<Record<number, string>>({});
  const colorIndexRef = useRef<number>(0);
  function getExportColor(exportId?: number): string {
    if (!exportId) return '#9CA3AF';
    if (!exportColorMap.current[exportId]) {
      exportColorMap.current[exportId] =
        colorPalette[colorIndexRef.current % colorPalette.length];
      colorIndexRef.current++;
    }
    return exportColorMap.current[exportId];
  }

  if (isLoading) {
    return (
      <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap={4}>
        <GridItem>
          <Skeleton height='300px' borderRadius='md' boxShadow='md' p={4} />
        </GridItem>
        <GridItem>
          <Skeleton height='300px' borderRadius='md' boxShadow='md' p={4} />
        </GridItem>
      </Grid>
    );
  }
  if (isError || !data) {
    return (
      <Center>
        <Text>Error al cargar exportaciones.</Text>
      </Center>
    );
  }

  return (
    <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap={4}>
      <GridItem bg='white' p={4} borderRadius='md' boxShadow={'md'}>
        <WeeklyExportsCalendar
          setCurrentDate={setCurrentDate}
          isCurrentWeek={isCurrentWeek}
          allData={exportsData}
          selectedProducer={selectedProducer}
          setSelectedProducer={setSelectedProducer}
          selectedBoxBrand={selectedBoxBrand}
          setSelectedBoxBrand={setSelectedBoxBrand}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          weekStart={weekStart}
          weekEnd={weekEnd}
          getExportColor={getExportColor}
          weekDaysOfWeek={computedDayLabels}
          boxesMatrix={boxesMatrix}
        />
      </GridItem>
      <GridItem bg='white' p={4} borderRadius='md' boxShadow={'md'}>
        <WeeklyExportsSummary
          filteredData={filteredData}
          getExportColor={getExportColor}
        />
      </GridItem>
    </Grid>
  );
}
