import {
  Accordion,
  AccordionItem,
  Heading,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import { BankAccountResponse } from '../../../types/bankAccount.response';

const DetailBankAccounts = ({
  account,
  width,
}: {
  account: BankAccountResponse;
  width: { sm: number; md: number };
}): React.JSX.Element => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <Heading>
          <AccordionButton pl="60px" width={{ sm: `${width.sm}px`, md: `${width.md}px` }}>
            <Box flex="1" textAlign="left" fontSize="md" fontWeight="bold">
              Información de Cuenta
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl="60px">
          <Text><strong>Banco:</strong> {account.bank}</Text>
          <Text><strong>Propietario:</strong> {account.owner}</Text>
          <Text><strong>ID Propietario:</strong> {account.ownerID}</Text>
          <Text><strong>Número de Cuenta:</strong> {account.accountNumber}</Text>
          <Text><strong>Tipo de Cuenta:</strong> {account.type}</Text>
          <Text><strong>Email:</strong> {account.email}</Text>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <Heading>
          <AccordionButton pl="60px" width={{ sm: `${width.sm}px`, md: `${width.md}px` }}>
            <Box flex="1" textAlign="left" fontSize="md" fontWeight="bold">
              Información de Entidad Asociada
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl="60px">
          {account.client && (
            <>
              <Text><strong>Tipo:</strong> Cliente</Text>
              <Text><strong>Nombre:</strong> {account.client.businessName}</Text>
              <Text><strong>RUC:</strong> {account.client.businessId}</Text>
              <Text><strong>Comercial:</strong> {account.client.commercialType}</Text>
              <Text><strong>Email:</strong> {account.client.email}</Text>
              <Text><strong>Teléfono:</strong> {account.client.phone}</Text>
            </>
          )}
          {account.merchant && (
            <>
              <Text><strong>Tipo:</strong> Productor</Text>
              <Text><strong>Nombre:</strong> {account.merchant.businessName}</Text>
              <Text><strong>RUC:</strong> {account.merchant.businessId}</Text>
              <Text><strong>Email:</strong> {account.merchant.email}</Text>
              <Text><strong>Ciudad:</strong> {account.merchant.city.name}</Text>
              <Text><strong>Dirección:</strong> {account.merchant.address}</Text>
            </>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailBankAccounts;
