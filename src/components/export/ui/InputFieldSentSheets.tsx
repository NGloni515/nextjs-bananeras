import { Flex } from '@chakra-ui/react';
import { FieldArray } from 'formik';
import React from 'react';
import InputFieldSentSheet from './InputFieldSentSheet';
import { SheetCocktail } from '../../../types/box-brand/additions/sheet';

interface InputFieldSentSheetsProps {
  name: string;
  sheetCocktailSelected: Partial<SheetCocktail>[];
  showNumberInput?: boolean;
  unit?: string;
}

const InputFieldSentSheets: React.FC<InputFieldSentSheetsProps> = ({
  name,
  sheetCocktailSelected = [],
  showNumberInput,
  unit,
}) => {
  return (
    <FieldArray name={name}>
      {() => (
        <Flex flexDirection='column' gap={3}>
          {sheetCocktailSelected.map((sheetCocktailPart, index) => (
            <InputFieldSentSheet
              key={index}
              name={`${name}[${index}].quantity`}
              sheetSelected={sheetCocktailPart}
              quantity={Number(sheetCocktailPart.quantity)}
              showNumberInput={showNumberInput}
              unit={unit}
            />
          ))}
        </Flex>
      )}
    </FieldArray>
  );
};

export default InputFieldSentSheets;
