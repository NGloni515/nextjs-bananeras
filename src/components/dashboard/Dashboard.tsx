'use client';

import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import CalendarSummaryContainer from './CalendarSummaryContainer';

interface DashboardProps {
  windowSize: { width: number | null; height: number | null };
}

const Dashboard = ({ windowSize }: DashboardProps): JSX.Element => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Center h='100vh'>
        <Text>Cargando...</Text>
      </Center>
    );
  }

  const role = session?.user?.role;

  return (
    <Box
      mx='auto'
      my='33px'
      width={{
        sm: `${Number(windowSize.width) - 20}px`,
        md: `${Number(windowSize.width) - 300}px`,
      }}
      borderRadius='md'
    >
      <Text fontSize='4xl' fontWeight='bold' mb='4'>
        Bienvenido {session?.user?.name}
      </Text>
      {role === 'MASTER' && (
        <>
          <CalendarSummaryContainer />
        </>
      )}
      <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap='4' mt={4}>
        <GridItem>
          {role === 'LOGISTICS' && (
            <Box bg='white' p='4' borderRadius='md'>
              Componente para Logística
            </Box>
          )}

          {role === 'EXPORT' && (
            <Box bg='white' p='4' borderRadius='md'>
              Componente para Exportación
            </Box>
          )}

          {role !== 'MASTER' && role !== 'LOGISTICS' && role !== 'EXPORT' && (
            <Text>No tienes acceso a contenido del dashboard.</Text>
          )}
        </GridItem>

        <GridItem></GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
