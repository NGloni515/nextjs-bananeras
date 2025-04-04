import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldHarborSelect from './InputFieldHarborSelect';
import { HarborType } from '../../types/harbor';

interface SelectHarborProps {
  name: string;
  harborSelect?: Partial<HarborType>;
  type: 'Nacional' | 'Internacional';
  setHarborSelect?: (harbor: Partial<HarborType> | null) => void;
}

const SelectHarbor: React.FC<SelectHarborProps> = ({
  name,
  harborSelect,
  type,
  setHarborSelect,
}) => {
  const [harbor, setHarbor] = useState<Partial<HarborType> | null>(null);

  useEffect(() => {
    if (!!harborSelect) {
      setHarbor(harborSelect);
    }
  }, [harborSelect]);

  useEffect(() => {
    if (!!setHarborSelect) {
      setHarborSelect(harbor);
    }
  }, [harbor, setHarborSelect]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldHarborSelect
          name={name}
          label={'Puerto'}
          placeholder={'Seleccione el Puerto'}
          setHarbor={setHarbor}
          type={type}
        />
        <Box>
          <FormLabel>Tipo</FormLabel>
          <Input isReadOnly={true} value={harbor?.type || ''} placeholder='Tipo de Puerto' />
        </Box>
        <Box>
          <FormLabel>Dirección</FormLabel>
          <Input
            isReadOnly={true}
            value={harbor?.address || ''}
            placeholder='Tipo de Dirección del puerto'
          />
        </Box>
        <Box>
          <FormLabel>Locación</FormLabel>
          <Input isReadOnly={true} value={harbor?.location || ''} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectHarbor;
