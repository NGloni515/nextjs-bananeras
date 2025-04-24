import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateClientPayment } from '../../hooks/client-payment/createClientPayment';
import { useUploadTransferImage } from '../../hooks/client-payment/uploadTransferImage';
import { BoxBrandType } from '../../types/box-brand/boxBrand';
import { ClientType } from '../../types/client';
import { ExportSentType } from '../../types/exportSent';
import SelectBoxBrand from '../box-brands/SelectBoxBrand';
import SelectClient from '../client/SelectClient';
import SelectBankAccount from '../export/export-payments/bank-account/SelectBankAccount';
import UploadLogoFile from '../producer/UploadLogoFile';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldNumber from '../ui/form/InputFieldNumber';
import InputFieldTextArea from '../ui/form/InputFieldTextArea';

const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/jpg',
];

interface ValuesProps {
  exportSentId: number | '';
  clientId: number | '';
  boxQuantity: number | '';
  boxBrandId: number | '';
  total: number | '';
  price: number | '';
  description: string;
  sourceBankAccountId: number | '';
  destinationBankAccountId: number | '';
  dataReviewed: boolean;
  transferFile: File | null;
}

const initialValues: ValuesProps = {
  exportSentId: '',
  clientId: '',
  boxQuantity: '',
  boxBrandId: '',
  price: '',
  description: '',
  total: '',
  sourceBankAccountId: '',
  destinationBankAccountId: '',
  dataReviewed: false,
  transferFile: null,
};

const validationSchema = Yup.object({
  exportSentId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  clientId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  boxQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  boxBrandId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  description: Yup.string().max(500, 'Debe tener 500 caracteres o menos'),
  total: Yup.number().moreThan(0, 'Debe ser mayor que 0').required('Requerido'),
  sourceBankAccountId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  destinationBankAccountId: Yup.number()
    .integer('Debe ser un número entero')
    .min(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
  transferFile: Yup.mixed()
    .required('Se requiere una imagen')
    .test('fileFormat', 'Formato no soportado', (value) => {
      return value && SUPPORTED_FORMATS.includes((value as File).type);
    }),
});

const ClientPendingPaymentForm = ({
  paymentSelected,
}: {
  paymentSelected: Partial<ExportSentType>;
  pathname?: string;
}): React.JSX.Element => {
  const [initialValuesPayment, setInitialValuesPayment] =
    useState<ValuesProps>(initialValues);
  const [clientSelect, setClientSelect] = useState<Partial<ClientType> | null>(
    paymentSelected?.export!.client || null
  );
  const [boxBrand, setBoxBrand] = useState<Partial<BoxBrandType> | null>(
    paymentSelected?.export!.boxBrand || null
  );
  const { mutateAsync: createClientPayment, isLoading: createLoading } =
    useCreateClientPayment();
  const { uploadTransferImage, isLoading } = useUploadTransferImage();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log('paymentSelected: ', paymentSelected);
    if (paymentSelected) {
      setInitialValuesPayment((prevValues) => ({
        ...prevValues,
        exportSentId: Number(paymentSelected.id),
        clientId: Number(paymentSelected.export?.client?.id),
        boxQuantity: Number(paymentSelected.export?.boxQuantity),
        boxBrandId: Number(paymentSelected.export?.boxBrand?.id),
      }));
    }
  }, [paymentSelected]);

  const sentPayment = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ): Promise<void> => {
    try {
      const {
        transferFile,
        boxQuantity,
        price,
        total,
        dataReviewed,
        ...paymentData
      } = values;
      void dataReviewed;
      const { clientPaymentId } = await createClientPayment({
        ...paymentData,
        boxQuantity: Number(boxQuantity),
        price: Number(price),
        total: Number(total),
      });

      if (transferFile) {
        await uploadTransferImage({
          file: transferFile,
          clientPaymentId,
          clientId: Number(values.clientId),
        });
      }

      toast({
        title: 'Cobro y Archivo Subidos con Éxito',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      queryClient.invalidateQueries('clientPayments');
      queryClient.invalidateQueries('exportsSentPending');
      queryClient.invalidateQueries('clientPaymentsPending');
      actions.resetForm();
      router.push('/dashboard/liquidation/client-payments');
    } catch (error: unknown) {
      let errorMessage = 'Ocurrió un error';
      if (isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValuesPayment}
      enableReinitialize={true}
      onSubmit={sentPayment}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize={'2xl'} p={'12px'}>
              Cliente
            </Heading>
            <Divider mb={'16px'} />

            <SelectClient
              name={'clientId'}
              setClientSelect={setClientSelect}
              clientSelect={clientSelect as Partial<ClientType>}
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Cobro
            </Heading>
            <Divider mb={'16px'} />

            <SelectBoxBrand
              name={'boxBrandId'}
              name2={'boxQuantity'}
              namePrice={'price'}
              nameSubtotal1={'total'}
              boxQuantity={Number(values.boxQuantity)}
              price={Number(values.price)}
              boxBrandSelect={boxBrand as Partial<BoxBrandType>}
              setBoxBrandSelect={setBoxBrand}
            />

            <InputFieldTextArea
              name={'description'}
              label={'Detalles del cobro'}
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Cuenta Bancaria Origen
            </Heading>
            <Divider mb={'16px'} />

            <SelectBankAccount
              name={'sourceBankAccountId'}
              label='Razón Social'
            />

            <Heading fontSize={'2xl'} p={'12px'}>
              Cuenta Bancaria Destino
            </Heading>
            <Divider mb={'16px'} />

            <SelectBankAccount
              name={'destinationBankAccountId'}
              label='Razón Social'
            />

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <Box></Box>
              <InputFieldNumber
                name={'total'}
                label={'Monto'}
                isDecimal
                isDolar
                value={values.total}
              />
            </SimpleGrid>
            <Heading fontSize={'2xl'} p={'12px'}>
              Subir Transferencia
            </Heading>
            <Divider mb={'16px'} />
            <UploadLogoFile name={'transferFile'} />
            <SimpleGrid columns={{ base: 1, sm: 1 }}>
              <CheckboxForm
                name='dataReviewed'
                label='He revisado los datos agregados'
              />
              <Button
                mt='12px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                isLoading={createLoading || isLoading}
              >
                Enviar
              </Button>
            </SimpleGrid>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default ClientPendingPaymentForm;
