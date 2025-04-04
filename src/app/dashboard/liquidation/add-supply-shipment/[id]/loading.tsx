import { Box, Center, Heading } from '@chakra-ui/react';

export default function Loading(): JSX.Element {
  return (
    <Box mx="auto" my="200px">
      <Center>
        <Heading>Cargando...</Heading>
      </Center>
    </Box>
  );
}
