import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldProducerSelect from './InputFieldProducerSelect';
import { MerchantResponse } from '../../types/merchant/merchant.response';

interface SelectProducerProps {
  name: string;
  producerSelect?: Partial<MerchantResponse>;
  setProducerSelect?: (producer: Partial<MerchantResponse> | null) => void;
}

const SelectProducer: React.FC<SelectProducerProps> = ({
  name,
  producerSelect,
  setProducerSelect,
}) => {
  const [producer, setProducer] = useState<Partial<MerchantResponse> | null>(null);

  useEffect(() => {
    if (!!producerSelect) {
      setProducer(producerSelect);
    }
  }, [producerSelect]);

  useEffect(() => {
    if (!!setProducerSelect) {
      setProducerSelect(producer);
    }
  }, [producer, setProducerSelect]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldProducerSelect
          name={name}
          label="Productor/Razón Social"
          placeholder="Seleccione el productor"
          setProducer={setProducer}
        />
        <Box>
          <FormLabel>RUC</FormLabel>
          <Input
            isReadOnly
            value={producer?.businessId || ''}
            placeholder="RUC del Productor"
          />
        </Box>
        <Box>
          <FormLabel>Dirección</FormLabel>
          <Input
            isReadOnly
            value={producer?.address || ''}
            placeholder="Dirección del Productor"
          />
        </Box>
        <Box>
          <FormLabel>Ciudad</FormLabel>
          <Input
            isReadOnly
            value={producer?.city?.name || ''}
            placeholder="Ciudad del Productor"
          />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectProducer;
