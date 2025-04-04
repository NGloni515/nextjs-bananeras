import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { VerifierResponse } from '../../../types/verifier/verifier.response';

interface DetailVerifiersProps {
  verifier: VerifierResponse;
  width: { sm: number; md: number };
}

const DetailVerifiers: React.FC<DetailVerifiersProps> = ({ verifier, width }) => {
  return (
    <Accordion allowMultiple defaultIndex={[0]}>
      <AccordionItem>
        <h2>
          <AccordionButton width={{ sm: `${width.sm}px`, md: `${width.md}px` }}>
            <Box flex="1" textAlign="left" fontWeight="bold">
              Detalles Generales
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text><strong>Nombre:</strong> {verifier.name}</Text>
          <Text><strong>RUC:</strong> {verifier.ruc}</Text>
          <Text><strong>Dirección:</strong> {verifier.address}</Text>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton width={{ sm: `${width.sm}px`, md: `${width.md}px` }}>
            <Box flex="1" textAlign="left" fontWeight="bold">
              Contactos Asociados
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {verifier.contacts.length ? (
            verifier.contacts.map((contact) => (
              <Box key={contact.id} mb={3}>
                <Text><strong>Nombre:</strong> {contact.name}</Text>
                <Text><strong>Email:</strong> {contact.email}</Text>
                <Text><strong>Teléfono:</strong> {contact.phone}</Text>
              </Box>
            ))
          ) : (
            <Text>No hay contactos registrados.</Text>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailVerifiers;
