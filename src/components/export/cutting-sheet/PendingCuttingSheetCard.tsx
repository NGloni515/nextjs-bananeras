/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  VStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ConfirmationModal from '../../ui/ConfirmationModal';

interface Props {
  exportItem: Partial<any>;
  pathname: string;
}

const PendingCuttingSheetCard = ({
  exportItem,
  pathname,
}: Props): React.JSX.Element => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (): void => {
    console.log(`export ${exportItem.id}: `, exportItem);
    router.push(`${pathname}/${exportItem.id}`);
  };

  const details = [
    {
      label: 'Productor',
      value: exportItem.export.merchant?.businessName,
    },
    {
      label: 'Finca',
      value: exportItem.export.business?.name,
    },
    {
      label: 'Puerto Salida',
      value: exportItem.export.harborDeparture?.name,
    },
    {
      label: 'Puerto Destino',
      value: exportItem.export.harborDestination?.name,
    },
    {
      label: 'Cliente',
      value: exportItem.export.client?.businessName,
    },
  ];

  return (
    <>
      <Card boxShadow='md' borderRadius='md' width={'350px'}>
        <CardHeader>
          <Heading fontSize={'xl'} fontWeight={'extrabold'} color={'teal.500'}>
            Hoja de Corte pendiente
          </Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align='stretch'>
            {details.map((detail, index) => (
              <Box key={index}>
                <Heading fontSize='lg' display='inline-block'>
                  {detail.label}:{' '}
                  <Text
                    as='span'
                    fontSize='md'
                    fontWeight={'normal'}
                    color='gray.600'
                  >
                    {detail.value}
                  </Text>
                </Heading>
              </Box>
            ))}
          </VStack>
        </CardBody>
        <CardFooter>
          <Button
            w={'100%'}
            colorScheme='teal'
            variant={'outline'}
            onClick={onOpen}
          >
            Realizar Hoja de Corte
          </Button>
        </CardFooter>
      </Card>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleClick}
        title={`Abrir hoja de corte para: ${exportItem.export.merchant?.businessName || 'Sin título'} - ${exportItem.export.client?.businessName || 'Sin título'}`}
        description='¿Estás seguro de que deseas empezar esta Hoja de Corte?'
      />
    </>
  );
};

export default PendingCuttingSheetCard;
