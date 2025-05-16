import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  Text,
  CardFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ExportSentType } from '../../types/exportSent';
import ConfirmationModal from '../ui/ConfirmationModal';

interface ExportCostCardProps {
  exportSentItem: Partial<ExportSentType>;
  pathname: string;
}

const ExportCostCard: React.FC<ExportCostCardProps> = ({
  exportSentItem,
  pathname,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (): void => {
    router.push(`${pathname}/${exportSentItem.id}`);
  };

  const details = [
    {
      label: 'Cliente',
      value: exportSentItem.export?.client?.businessName,
    },
    {
      label: 'Finca',
      value: exportSentItem.export?.business?.name,
    },
    {
      label: 'Productor',
      value: exportSentItem.export?.merchant?.businessName,
    },
  ];

  return (
    <>
      <Card boxShadow='md' borderRadius='md' width={'350px'}>
        <CardHeader>
          <Heading fontSize={'xl'} fontWeight={'extrabold'} color={'teal.500'}>
            Validación Pendiente
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
            Realizar Validación de Costos
          </Button>
        </CardFooter>
      </Card>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleClick}
        title={`Abrir Validación de Costos: ${exportSentItem.export?.merchant?.businessName || 'Sin título'}`}
        description='¿Estás seguro de que deseas empezar esta Validación de Costos?'
      />
    </>
  );
};

export default ExportCostCard;
