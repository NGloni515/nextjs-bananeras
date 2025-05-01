import { useToast } from '@chakra-ui/react';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useQueryClient } from 'react-query';
import { useCreateExport } from '@/hooks/export/createExport';
import {
  ValuesProps,
  validationSchema,
  initialValues,
} from '../schemas/export.schema';

export function useSubmitExport(): {
  onSubmit: (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ) => Promise<void>;
  validationSchema: typeof validationSchema;
  initialValues: typeof initialValues;
  isLoading: boolean;
} {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: createExport, isLoading } = useCreateExport();

  const onSubmit = async (
    values: ValuesProps,
    formikHelpers: FormikHelpers<ValuesProps>
  ): Promise<void> => {
    const {
      weekCutting,
      cuttingDate,
      boxQuantity,
      dataReviewed,
      ...restExportData
    } = values;
    dataReviewed;
    const exportData = {
      ...restExportData,
      cuttingDate,
      weekDescription: weekCutting.description,
      weekDaysOfWeek: weekCutting.daysOfWeek,
      weekBoxesOfDay: weekCutting.boxesOfDay,
      weekTotal: Number(boxQuantity),
      boxQuantity: Number(boxQuantity),
      numberOfVerifiers: Number(values.numberOfVerifiers),
    };

    createExport(exportData, {
      onError: (error) => {
        const data = error.response?.data;
        if (!data) return;
        const { statusCode, message, errors: errorTitle, model, prop } = data;
        toast({
          title: `Error ${statusCode}: ${errorTitle}`,
          description: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        if (statusCode === 401) {
          router.push('/api/auth/signout');
        }
        if (model && prop) {
          formikHelpers.setFieldError(`${prop}`, message);
        }
      },
      onSuccess: () => {
        toast({
          title: 'Exportación Creada con éxito',
          description: 'La exportación se ha registrado correctamente.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        queryClient.invalidateQueries('exports');
        queryClient.invalidateQueries('exportsPending');
        queryClient.invalidateQueries('cuttingSheets');
        queryClient.invalidateQueries('cuttingSheetsPending');
        formikHelpers.resetForm();
        router.push('/dashboard/export/search');
      },
    });
  };

  return {
    onSubmit,
    validationSchema,
    initialValues,
    isLoading,
  };
}
