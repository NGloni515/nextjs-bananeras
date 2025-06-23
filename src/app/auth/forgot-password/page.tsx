'use client';

import {
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import Link_Next from 'next/link';
import * as Yup from 'yup';
import InputFieldText from '@/components/ui/form/InputFieldText';
import { Logo } from '@/components/ui/Logo';

const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('Requerido'),
});

export default function ForgotPasswordPage(): JSX.Element {
  const toast = useToast();

  return (
    <Center minH='100vh'>
      <Flex direction='column' w='100%' maxW='480px' p={4}>
        <Logo width={150} height={150} align='center' />
        <Heading fontSize='2xl' mt={4} mb={2}>
          Restablecer contraseña
        </Heading>
        <Text fontSize='sm' color='gray.600' mb={8}>
          Introduce tu correo para recibir el enlace de recuperación.
        </Text>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/exporter/forgot-password`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(values),
                }
              );
              if (!res.ok) throw new Error('Error al enviar');
              toast({
                title: 'Correo enviado',
                description:
                  'Revisa tu bandeja para restablecer tu contraseña.',
                status: 'success',
                duration: 4000,
                isClosable: true,
              });
              resetForm();
            } catch {
              toast({
                title: 'Error',
                description: 'No se pudo enviar el correo.',
                status: 'error',
                duration: 4000,
                isClosable: true,
              });
            }
          }}
        >
          <Form>
            <InputFieldText
              name='email'
              label='Correo Electrónico'
              placeholder='Correo electrónico'
            />
            <Button type='submit' colorScheme='teal' w='full' mt={4} size='md'>
              Enviar enlace
            </Button>
          </Form>
        </Formik>

        <Center>
          <Text mt='20px'>
            ¿No tienes una cuenta?{' '}
            <Link as={Link_Next} color='teal.500' href='/auth/signup'>
              Registrarse
            </Link>
          </Text>
        </Center>

        <Center>
          <Text mt='20px'>
            ¿Ya estás registrado?{' '}
            <Link as={Link_Next} color='teal.500' href='/auth/signin'>
              Iniciar sesión
            </Link>
          </Text>
        </Center>
      </Flex>
    </Center>
  );
}
