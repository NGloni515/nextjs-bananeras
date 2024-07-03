import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import { InsecticideCocktailPart } from '../../../types/box-brand/additions/insecticideCocktailPart';

interface InputFieldSentInsecticideProps {
  name: string;
  insecticideSelected: Partial<InsecticideCocktailPart>;
  quantity: number | '';
  placeholder?: string;
}

const InputFieldSentInsecticide: React.FC<InputFieldSentInsecticideProps> = ({
  name,
  insecticideSelected,
  quantity,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleBlur = (event: React.FocusEvent) => {
    field.onBlur(event);

    helpers.setValue(Number(meta.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      helpers.setValue(Number(field.value));
    }
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <Grid templateColumns='repeat(10, 1fr)' gap={5} alignItems='center'>
        <GridItem colSpan={2}>
          <FormLabel fontSize='sm' m={0} width={'100%'}>
            {`${insecticideSelected.insecticide?.name}: `}
          </FormLabel>
        </GridItem>
        <GridItem colSpan={3}>
          <Input
            name={`${name}.activeIngredient`}
            p={'0px'}
            pl={'4px'}
            value={`${insecticideSelected.insecticide?.activeIngredient}`}
            isReadOnly={true}
            focusBorderColor='gray.200'
            _hover={{ borderColor: 'gray.200' }}
            cursor={'not-allowed'}
            opacity={0.8}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            name={`${name}.dose`}
            p={'0px'}
            pr={'4px'}
            textAlign={'right'}
            value={`${insecticideSelected.insecticide?.dose}`}
            isReadOnly={true}
            focusBorderColor='gray.200'
            _hover={{ borderColor: 'gray.200' }}
            cursor={'not-allowed'}
            opacity={0.8}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            name={`${name}.need`}
            value={quantity}
            textAlign={'right'}
            p={'0px'}
            pr={'4px'}
            isReadOnly={true}
            focusBorderColor='gray.200'
            _hover={{ borderColor: 'gray.200' }}
            cursor={'not-allowed'}
            opacity={0.8}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <NumberInput {...field}>
            <NumberInputField
              {...field}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder || insecticideSelected.insecticide?.name}
              textAlign='right'
              px={'16px'}
            />
          </NumberInput>
        </GridItem>
      </Grid>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldSentInsecticide;