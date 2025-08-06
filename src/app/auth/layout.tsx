'use client';
import { Box, Flex, Text, theme, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const scrollbarThumbColor = useColorModeValue('#2a9d5aff', '#1d573aff');
  const scrollbarThumbHover = useColorModeValue('#1d7c49ff', '#4da06dff');

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
      <Box
        w={{ base: '100%', xl: '50%', '2xl': '50%' }}
        h='100vh'
        overflowY='auto'
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 8 }}
        css={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            width: '8px',
            opacity: 0,
            transition: 'opacity 0.3s',
          },
          '&:hover::-webkit-scrollbar': {
            opacity: 1,
          },

          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.05)',
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: scrollbarThumbColor,
            borderRadius: '8px',
            border: '2px solid transparent',
            backgroundClip: 'content-box',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: scrollbarThumbHover,
          },
        }}
      >
        {children}
      </Box>
    </Flex>
  );
}
