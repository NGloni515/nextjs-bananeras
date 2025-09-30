/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  VStack,
  Text,
  HStack,
  Badge,
  Stack,
  useDisclosure,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ConfirmationModal from '../../ui/ConfirmationModal';

interface Props {
  exportItem: Partial<any>;
  pathname: string;
}

const LabelValue = ({
  label,
  value,
}: { label: string; value?: React.ReactNode }): React.JSX.Element => {
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const valueColor = useColorModeValue('gray.800', 'gray.100');
  return (
    <HStack align="start" spacing={2}>
      <Text fontSize="sm" color={labelColor} minW="120px">{label}:</Text>
      <Text fontSize="sm" color={valueColor} fontWeight="medium" flex="1" noOfLines={2}>
        {value ?? '—'}
      </Text>
    </HStack>
  );
};

const MetaPill = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <Badge
    variant="subtle"
    colorScheme="green"
    borderRadius="full"
    px={3}
    py={1}
    fontSize="xs"
    whiteSpace="nowrap"
  >
    {children}
  </Badge>
);

const PendingCuttingSheetCard = ({
  exportItem,
  pathname,
}: Props): React.JSX.Element => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirm = (): void => {
    const exportId = exportItem?.export?.id ?? exportItem?.id;
    if (exportId) router.push(`${pathname}/${exportId}`);
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const titleColor = useColorModeValue('gray.900', 'gray.100');
  const subColor = useColorModeValue('gray.600', 'gray.300');

  const producer = exportItem?.export?.merchant?.businessName;
  const farm = exportItem?.export?.business?.name;
  const harborDep = exportItem?.export?.harborDeparture?.name;
  const harborDest = exportItem?.export?.harborDestination?.name;
  const client = exportItem?.export?.client?.businessName;

  const week = exportItem?.weekDescription;
  const totalBoxes = exportItem?.export?.boxQuantity ?? exportItem?.weekTotal;
  const booking = exportItem?.bookingNumber;
  const ship = exportItem?.shipName;
  const contract = exportItem?.contractType;

  return (
    <>
      <Card
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        boxShadow="md"
        overflow="hidden"
        borderTopWidth="4px"
        borderTopColor="green.500"
        h="100%"
      >
        <CardHeader pb={3}>
          <HStack spacing={3} align="center">
            <VStack spacing={0} align="start">
              <Heading size="md" color={titleColor}>
                Hoja de Corte pendiente
              </Heading>
              <HStack spacing={2} mt={1} flexWrap="wrap">
                {week && <MetaPill>{week}</MetaPill>}
                {!!totalBoxes && <MetaPill>{totalBoxes} cajas</MetaPill>}
                {contract && <MetaPill>Contrato: {contract}</MetaPill>}
              </HStack>
            </VStack>
          </HStack>
        </CardHeader>

        <CardBody pt={0}>
          <VStack spacing={3} align="stretch">
            <Divider />
            <Stack spacing={3}>
              <LabelValue label="Productor" value={producer} />
              <LabelValue label="Finca" value={farm} />
              <LabelValue label="Puerto Salida" value={harborDep} />
              <LabelValue label="Puerto Destino" value={harborDest} />
              <LabelValue label="Cliente" value={client} />
            </Stack>

            {(booking || ship) && (
              <HStack spacing={2} pt={1} flexWrap="wrap">
                {booking && (
                  <Badge colorScheme="gray" variant="subtle" px={2} py={1} borderRadius="md">
                    Booking: <Text as="span" ml={1} color={subColor}>{booking}</Text>
                  </Badge>
                )}
                {ship && (
                  <Badge colorScheme="gray" variant="subtle" px={2} py={1} borderRadius="md">
                    Buque: <Text as="span" ml={1} color={subColor}>{ship}</Text>
                  </Badge>
                )}
              </HStack>
            )}
          </VStack>
        </CardBody>

        <CardFooter pt={0}>
          <Button
            w="100%"
            colorScheme="green"
            onClick={onOpen}
            borderRadius="lg"
            _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
            transition="all 0.15s ease"
          >
            Realizar Hoja de Corte
          </Button>
        </CardFooter>
      </Card>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
        title={`Abrir hoja de corte para: ${producer || '—'} — ${client || '—'}`}
        description="¿Estás seguro de que deseas empezar esta Hoja de Corte?"
      />
    </>
  );
};

export default PendingCuttingSheetCard;
