import { Button, Divider, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputFieldText from '../ui/form/InputFieldText';

interface ValuesProps {
  businessObjName: string;
  businessObjAddress: string;
  businessObjArea: number;
  businessObjCity: string;
  businessObjLatitude: number;
  businessObjLongitude: number;
  businessManagerObjName: string;
  businessManagerObjEmail: string;
  businessManagerObjPhone: string;
}

const initialValues: ValuesProps = {
  businessObjName: '',
  businessObjAddress: '',
  businessObjArea: 0,
  businessObjCity: '',
  businessObjLatitude: 0,
  businessObjLongitude: 0,
  businessManagerObjName: '',
  businessManagerObjEmail: '',
  businessManagerObjPhone: '',
};

const validationSchema = Yup.object({
  businessObjName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  businessObjAddress: Yup.string()
    .min(13, 'Must be 13 characters or less')
    .required('Required'),
  businessObjArea: Yup.number()
    .moreThan(0, 'Must be greater than 0')
    .required('Required'),
  businessObjCity: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  businessObjLatitude: Yup.number()
    .min(-90, 'Must be at least -90')
    .max(90, 'Must be at most 90')
    .required('Required'),
  businessObjLongitude: Yup.number()
    .min(-180, 'Must be at least -180')
    .max(180, 'Must be at most 180')
    .required('Required'),
  businessManagerObjName: Yup.string().required('Required'),
  businessManagerObjEmail: Yup.string()
    .email('Invalid email')
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  businessManagerObjPhone: Yup.string()
    .matches(/^[0-9]+$/, 'Must be a valid phone number')
    .min(10, 'Must be at least 10 digits')
    .max(15, 'Must be 15 digits or less')
    .required('Required'),
});

const AddProducerForm = () => {
  const sendProducerForm = async (values: ValuesProps) => {
    console.log('sending values: ', values);

    return;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={sendProducerForm}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection='column' gap={3}>
              <Heading fontSize={'2xl'} p={'16px'}>
                Finca
              </Heading>
              <Divider mb={'16px'} />

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText name={'businessObjName'} label={'Nombre'} />
                <InputFieldText name={'businessObjArea'} label={'Área'} />
                <InputFieldText name={'businessObjCity'} label={'Ciudad'} />
                <InputFieldText
                  name={'businessObjLatitude'}
                  label={'Latitud'}
                />
                <InputFieldText
                  name={'businessObjAddress'}
                  label={'Dirección'}
                />
                <InputFieldText
                  name={'businessObjLongitude'}
                  label={'Longitud'}
                />
              </SimpleGrid>

              <Heading fontSize={'2xl'} p={'16px'}>
                Responsable
              </Heading>
              <Divider mb={'16px'} />

              <InputFieldText
                name={'businessManagerObjName'}
                label={'Nombre'}
              />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <InputFieldText
                  name={'businessManagerObjEmail'}
                  label={'Email'}
                />
                <InputFieldText
                  name={'businessManagerObjPhone'}
                  label={'Phone'}
                />
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

export default AddProducerForm;