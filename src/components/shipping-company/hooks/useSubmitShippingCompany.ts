// useSubmitShippingCompany.ts
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useQueryClient } from 'react-query';
import { useCreateShippingCompany } from '@/hooks/export/shippingCompany/createShippingCompany';
import { ServerErrorResponse } from '../../../types/errorResponse';
import { validationSchema, initialValues, ValuesProps } from '../schemas/shippingCompany.schema';

export function useSubmitShippingCompany(): {
    onSubmit: (values: ValuesProps, formikHelpers: FormikHelpers<ValuesProps>) => Promise<void>;
    validationSchema: typeof validationSchema;
    initialValues: typeof initialValues;
    isLoading: boolean;
} {
    const toast = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutate: createShippingCompany, isLoading } = useCreateShippingCompany();

    const onSubmit = async (
        values: ValuesProps,
        formikHelpers: FormikHelpers<ValuesProps>
    ): Promise<void> => {
        const { dataReviewed, ...companyData } = values;
        dataReviewed;
        createShippingCompany(
            { ...companyData },
            {
                onError: (error: AxiosError<ServerErrorResponse>) => {
                    const data = error.response?.data;
                    if (!data) return;
                    const { statusCode, message, errors: errorTitle } = data;
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
                },
                onSuccess: () => {
                    toast({
                        title: 'Naviero Creado con éxito',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    queryClient.invalidateQueries('shipping-companies');
                    formikHelpers.resetForm();
                    router.push('/dashboard/client/shipping-companies');
                },
            }
        );
    };

    return {
        onSubmit,
        validationSchema,
        initialValues,
        isLoading,
    };
}
