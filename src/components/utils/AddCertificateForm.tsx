import {
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateCertificate } from '@/hooks/utils/createCertificate';
import { ServerErrorResponse } from '@/types/errorResponse';
import { useExporter } from '../../hooks/useUserProfile';
import UploadLogoFile from '../producer/UploadLogoFile';
import InputFieldDate from '../ui/form/InputFieldDate';
import InputFieldText from '../ui/form/InputFieldText';

interface AddCertificateFormProps {
  onClose?: () => void;
}

interface ValuesProps {
  name: string;
  certificateCode: string;
  issueDate: string;
  expirationDate: string;
  logo: File | null;
}

const initialValues: ValuesProps = {
  name: '',
  certificateCode: '',
  issueDate: '',
  expirationDate: '',
  logo: null,
};

const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/jpg',
];

const validationSchema = Yup.object({
  name: Yup.string().required('Requerido'),
  certificateCode: Yup.string().required('Requerido'),
  issueDate: Yup.date().required('Requerido'),
  expirationDate: Yup.date().required('Requerido'),
  logo: Yup.mixed()
    .required('Se requiere un archivo de logo')
    .test('fileFormat', 'Formato no soportado', (value) => {
      return value && SUPPORTED_FORMATS.includes((value as File).type);
    }),
});

const AddCertificateForm = ({
  onClose,
}: AddCertificateFormProps): React.JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useExporter();

  const onboardingStatus = user?.userDetails?.onboardingStatus ?? 'done';

  const { mutateAsync: createCertificate, isLoading } = useCreateCertificate({
    onboardingStatus,
  });

  const handleSubmit = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ): Promise<void> => {
    try {
      await createCertificate(values);
      queryClient.invalidateQueries(['certificates']);

      toast({
        title: 'Certificado Creado con Éxito',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      if (onboardingStatus === 'done') {
        queryClient.invalidateQueries(['certificates']);
      }

      actions.resetForm();
      onClose?.();
    } catch (error) {
      const axiosError = error as AxiosError<ServerErrorResponse>;
      const data = axiosError?.response?.data;

      toast({
        title: `Error ${data?.statusCode || ''}`,
        description: data?.message || 'Ocurrió un error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      if (data?.statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Flex flexDirection='column' gap={3}>
            <Heading fontSize='2xl' p='12px'>
              Agregar Certificado
            </Heading>
            <Divider mb='16px' />
            <InputFieldText name='name' label='Nombre' />
            <InputFieldText
              name='certificateCode'
              label='Código del Certificado'
            />
            <InputFieldDate name='issueDate' label='Fecha de Emisión' />
            <InputFieldDate name='expirationDate' label='Fecha de Expiración' />
            <FormLabel fontSize='sm' mb={0}>
              Logo
            </FormLabel>
            <UploadLogoFile name='logo' />
            <Button
              mt='32px'
              py='8px'
              px='16px'
              type='submit'
              colorScheme='teal'
              isLoading={isLoading}
            >
              Agregar
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default AddCertificateForm;
