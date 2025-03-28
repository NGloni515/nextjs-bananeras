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
import { TransportResponse } from '../../../types/transport/transport.response';

interface DetailTransportsProps {
  transport: TransportResponse;
  width: { sm: number; md: number };
}

const DetailTransports: React.FC<DetailTransportsProps> = ({ transport, width }) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <Heading>
          <AccordionButton
            pl="60px"
            width={{ sm: `${width.sm}px`, md: `${width.md}px` }}
          >
            <Box flex="1" textAlign="left" fontSize="md" fontWeight="bold">
              Detalles Generales
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl="60px">
          <Text><strong>Nombre:</strong> {transport.name}</Text>
          <Text><strong>RUC:</strong> {transport.ruc}</Text>
          <Text><strong>Dirección:</strong> {transport.address}</Text>
          <Text><strong>Rastreo Satelital:</strong> {transport.satelliteTracking ? 'Sí' : 'No'}</Text>
        </AccordionPanel>
      </AccordionItem>

      {transport.transportCertifications.length > 0 && (
        <AccordionItem>
          <Heading>
            <AccordionButton
              pl="60px"
              width={{ sm: `${width.sm}px`, md: `${width.md}px` }}
            >
              <Box flex="1" textAlign="left" fontSize="md" fontWeight="bold">
                Certificaciones
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4} pl="60px">
            {transport.transportCertifications.map((cert, i) => (
              <Text key={i}>• {cert.certification.name}</Text>
            ))}
          </AccordionPanel>
        </AccordionItem>
      )}

      {transport.contacts.length > 0 && (
        <AccordionItem>
          <Heading>
            <AccordionButton
              pl="60px"
              width={{ sm: `${width.sm}px`, md: `${width.md}px` }}
            >
              <Box flex="1" textAlign="left" fontSize="md" fontWeight="bold">
                Contactos
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4} pl="60px">
            {transport.contacts.map((contact, i) => (
              <Box key={i} mb={3}>
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

export default DetailTransports;
