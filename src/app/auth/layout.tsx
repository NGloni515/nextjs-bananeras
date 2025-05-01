import { Box, Flex, Text, theme } from '@chakra-ui/react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <Flex minH='100vh'>
      {/* Parte izquierda */}
      <Box
        w={{ xl: '50%', '2xl': '50%' }}
        position='relative'
        display={{
          base: 'none',
          sm: 'none',
          md: 'none',
          lg: 'none',
          xl: 'block',
          '2xl': 'block',
        }}
      >
        <Image src='/banano-pic.png' alt='Imagen' fill />
        <Box
          position='absolute'
          top='0'
          left='0'
          width='100%'
          py={{ xl: '24px', '2xl': '24px' }}
          px={'32px'}
          display='flex'
          justifyContent='center'
          alignItems='center'
          bgGradient='linear(to-b, rgba(40, 130, 93, 0.92), rgba(40, 130, 93, 0))'
        >
          <Text
            fontSize={{
              xl: theme.fontSizes['3xl'],
              '2xl': theme.fontSizes['4xl'],
            }}
            fontWeight={{
              xl: theme.fontWeights.extrabold,
              '2xl': theme.fontWeights.extrabold,
            }}
            textAlign='center'
            color='white'
          >
            Gestiona tus exportaciones con control total y trazabilidad en
            tiempo real
          </Text>
        </Box>
        <Box
          position='absolute'
          bottom='0'
          left='0'
          width='100%'
          py={'24px'}
          px={'24px'}
          display='flex'
          bgGradient='linear(to-b, rgba(40, 130, 93, 0), rgba(40, 130, 93, 0.92))'
        ></Box>
      </Box>

      {/* Parte derecha */}
      <Box w={{ base: '100%', xl: '50%', '2xl': '50%' }}>{children}</Box>
    </Flex>
  );
}
