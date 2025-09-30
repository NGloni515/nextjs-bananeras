'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  Divider,
  Badge,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ExportSentType } from '../../types/exportSent';
import ConfirmationModal from '../ui/ConfirmationModal';

interface ExportCostCardProps {
  exportSentItem: Partial<ExportSentType>;
  pathname: string;
}

const LabelValue = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}): React.JSX.Element => {
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const valueColor = useColorModeValue('gray.800', 'gray.100');
  return (
    <HStack align="start" spacing={2}>
      <Text fontSize="sm" color={labelColor} minW="120px">
        {label}:
      </Text>
      <Text fontSize="sm" color={valueColor} fontWeight="medium" flex="1" noOfLines={2}>
        {value ?? '—'}
      </Text>
    </HStack>
  );
};

const ExportCostCard: React.FC<ExportCostCardProps> = ({ exportSentItem, pathname }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (): void => {
    router.push(`${pathname}/${exportSentItem.id}`);
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const titleColor = useColorModeValue('gray.900', 'gray.100');
  const subColor = useColorModeValue('gray.600', 'gray.300');

  const client = exportSentItem.export?.client?.businessName;
  const farm = exportSentItem.export?.business?.name;
  const producer = exportSentItem.export?.merchant?.businessName;
  const totalBoxes = exportSentItem.export?.boxQuantity;


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
        _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
        transition="all 0.2s ease"
      >
        <CardHeader pb={3}>
          <HStack spacing={3} align="center" justify="space-between">
            <VStack spacing={0} align="start">
              <Heading size="md" color={titleColor}>
                Validación de Costos
              </Heading>
              <HStack spacing={2} mt={1} flexWrap="wrap">
                {!!totalBoxes && <Badge variant="subtle"
                  colorScheme="green"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  whiteSpace="nowrap">{totalBoxes} cajas</Badge>}
              </HStack>
            </VStack>
          </HStack>
        </CardHeader>

        <CardBody pt={0}>
          <VStack spacing={3} align="stretch">
            <Divider />
            <Stack spacing={3}>
              <LabelValue label="Cliente" value={client} />
              <LabelValue label="Finca" value={farm} />
              <LabelValue label="Productor" value={producer} />
            </Stack>
            <HStack spacing={2} pt={1} flexWrap="wrap">
              <Text fontSize="xs" color={subColor}></Text>
            </HStack>
          </VStack>
        </CardBody>

        <CardFooter pt={0}>
          <Button
            w="100%"
            colorScheme="green"
            onClick={onOpen}
            borderRadius="lg"
            fontWeight="semibold"
            _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
            transition="all 0.2s ease"
          >
            Realizar Validación de Costos
          </Button>
        </CardFooter>
      </Card>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleClick}
        title={`Abrir Validación de Costos: ${producer || '—'}`}
        description="¿Estás seguro de que deseas empezar esta Validación de Costos?"
      />
    </>
  );
};

export default ExportCostCard;
