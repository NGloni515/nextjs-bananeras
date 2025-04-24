/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import { useClientPaymentsPending } from './client-payment/getClientPaymentPending';
import { useCuttingSheetsPending } from './export/cuttingSheet/getExportsSentPending';
import { useExportsSentPending } from './export/export-sent/getExportsSentPending';
import { useExportsPending } from './export/getExportsPending';

interface MenuCounts {
  addSupplyShipment: number;
  producerPendingPayments: number;
  addCuttingSheet: number;
  clientPendingPayments: number;
}

export function useMenuCounts(): {
  counts: MenuCounts;
  loading: boolean;
  error: any;
} {
  const {
    data: supplyData,
    isLoading: isSupplyLoading,
    error: supplyError,
  } = useExportsPending({ page: 1, limit: 1 });

  const {
    data: producerData,
    isLoading: isProducerLoading,
    error: producerError,
  } = useExportsSentPending({ page: 1, limit: 1 });

  const {
    data: clientData,
    isLoading: isClientLoading,
    error: clientError,
  } = useClientPaymentsPending({ page: 1, limit: 1 });

  const {
    data: cuttingData,
    isLoading: isCuttingLoading,
    error: cuttingError,
  } = useCuttingSheetsPending({ page: 1, limit: 1 });

  const [counts, setCounts] = useState<MenuCounts>({
    addSupplyShipment: 0,
    producerPendingPayments: 0,
    addCuttingSheet: 0,
    clientPendingPayments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      !isSupplyLoading &&
      !isProducerLoading &&
      !isCuttingLoading &&
      !isClientLoading
    ) {
      setCounts({
        addSupplyShipment: supplyData?.length || 0,
        producerPendingPayments: producerData?.length || 0,
        addCuttingSheet: cuttingData?.length || 0,
        clientPendingPayments: clientData?.length || 0,
      });
      setLoading(false);
    }
    if (supplyError || producerError || cuttingError || clientError) {
      setLoading(false);
    }
  }, [
    isSupplyLoading,
    isProducerLoading,
    isCuttingLoading,
    isClientLoading,
    supplyData,
    producerData,
    cuttingData,
    clientData,
    supplyError,
    producerError,
    cuttingError,
    clientError,
  ]);

  return { counts, loading, error };
}
