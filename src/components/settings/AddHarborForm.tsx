'use client';
import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateHarbor } from '@/hooks/harbor/createHarbor';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  name: string;
  country: string;
  city: string;
  transportTime: string;
  latitude: number;
  longitude: number;
}

const initialValues: ValuesProps = {
  country: '',
  name: '',
  latitude: 0,
  longitude: 0,
  city: '',
  transportTime: '',
};

const validationSchema = Yup.object({
  country: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  latitude: Yup.number()
    .min(-90, 'Must be at least -90')
    .max(90, 'Must be at most 90')
    .required('Required'),
  longitude: Yup.number()
    .min(-180, 'Must be at least -180')
    .max(180, 'Must be at most 180')
    .required('Required'),
  city: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  transportTime: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
});

const AddHarborForm = () => {
  const { createHarbor } = useCreateHarbor();
  const toast = useToast();
  const queryClient = useQueryClient();

  const addHarbor = async (
    values: ValuesProps,
    actions: { resetForm: () => void }
  ) => {
    // console.log('adding Harbor: ', values);

    createHarbor(
      {
        ...values,
      },
      {
        onError: (error) => {
          toast({
            title: 'Error.',
            description: `${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title: 'Productor creado',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          queryClient.invalidateQueries('harbors');
          actions.resetForm();
        },
      }
    );
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={addHarbor}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'12px'}>
                Agregando Puerto
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText name={'name'} label={'Nombre'} />
                <InputFieldText
                  label={'Tiempo de Transporte'}
                  name={'transportTime'}
                />
                <InputFieldText name={'country'} label={'País'} />
                <InputFieldText name={'latitude'} label={'Latitud'} />
                <InputFieldText name={'city'} label={'Ciudad'} />
                <InputFieldText name={'longitude'} label={'Longitud'} />
              </SimpleGrid>

              <Button
                mt='32px'
                py='8px'
                px='16px'
                type='submit'
                colorScheme='teal'
                variant={'purple'}
                isLoading={isSubmitting}
              >
                Enviar
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddHarborForm;