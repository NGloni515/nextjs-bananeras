import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import { SheetCocktail } from '../../../types/box-brand/additions/sheet';

interface InputFieldSentSheetProps {
  name: string;
  sheetSelected: Partial<SheetCocktail>;
  quantity: number | '';
  placeholder?: string;
  showNumberInput?: boolean;
  unit?: string;
}

const InputFieldSentSheet: React.FC<InputFieldSentSheetProps> = ({
  name,
  sheetSelected,
  quantity,
  placeholder,
  showNumberInput = true,
  unit,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleBlur = (event: React.FocusEvent): void => {
    field.onBlur(event);

    helpers.setValue(Number(meta.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      helpers.setValue(Number(field.value));
    }
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <Grid templateColumns='repeat(10, 1fr)' alignItems='center'>
        <GridItem colSpan={2}>
          <FormLabel fontSize='sm' m={0} width={'100%'}>
            {`${sheetSelected.sheet?.name}: `}
          </FormLabel>
        </GridItem>
        <GridItem colSpan={4}></GridItem>
        <GridItem colSpan={2}>
          <Input
            name={`${name}.need`}
            value={quantity}
            textAlign={'left'}
            p={'0px'}
            pl={'16px'}
            isReadOnly={true}
            focusBorderColor='gray.200'
            _hover={{ borderColor: 'gray.200' }}
            cursor={'not-allowed'}
            opacity={0.8}
          />
        </GridItem>
        {showNumberInput && (
          <GridItem colSpan={2} pl={'4px'}>
            <InputGroup width={'100%'}>
              {unit && (
                <InputRightElement
                  pointerEvents='none'
                  color='gray.500'
                  fontSize='1em'
                  mr={'8px'}
                >
                  {unit}
                </InputRightElement>
              )}
              <NumberInput {...field}>
                <NumberInputField
                  {...field}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder || sheetSelected.sheet?.name}
                  textAlign='left'
                />
              </NumberInput>
            </InputGroup>
          </GridItem>
        )}
      </Grid>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldSentSheet;
