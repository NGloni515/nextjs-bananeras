import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { DepositResponse } from '../../../types/deposit/deposit.response';

interface DetailDepositsProps {
  deposit: DepositResponse;
  width: { sm: number; md: number };
}

const DetailDeposits: React.FC<DetailDepositsProps> = ({ deposit, width }) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <Heading>
          <AccordionButton width={{ sm: `${width.sm}px`, md: `${width.md}px` }}>
            <Box flex='1' textAlign='left' fontSize='md' fontWeight='bold'>
              Detalles del Depósito
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4}>
          <Text><strong>Nombre:</strong> {deposit.name}</Text>
          <Text><strong>Código:</strong> {deposit.code}</Text>
          <Text><strong>Dirección:</strong> {deposit.address}</Text>
          <Text><strong>Ciudad:</strong> {deposit.city.name}</Text>
          <Text><strong>Hora de Apertura:</strong> {deposit.openTime}</Text>
          <Text><strong>Hora de Cierre:</strong> {deposit.closeTime}</Text>
          {deposit.latitude && deposit.longitude && (
            <Text><strong>Latitud / Longitud:</strong> {deposit.latitude}, {deposit.longitude}</Text>
          )}
        </AccordionPanel>
      </AccordionItem>

      {deposit.contacts.length > 0 && (
        <AccordionItem>
          <Heading>
            <AccordionButton width={{ sm: `${width.sm}px`, md: `${width.md}px` }}>
              <Box flex='1' textAlign='left' fontSize='md' fontWeight='bold'>
                Contactos
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            {deposit.contacts.map((contact, index) => (
              <Box key={index} mb={4}>
                <Text><strong>Nombre:</strong> {contact.name}</Text>
                {contact.role && <Text><strong>Rol:</strong> {contact.role}</Text>}
                <Text><strong>Email:</strong> {contact.email}</Text>
                <Text><strong>Teléfono:</strong> {contact.phone}</Text>
              </Box>
            ))}
          </AccordionPanel>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default DetailDeposits;
