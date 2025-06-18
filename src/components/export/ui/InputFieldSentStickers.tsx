import { Flex } from '@chakra-ui/react';
import { FieldArray } from 'formik';
import React from 'react';
import InputFieldSentSticker from './InputFieldSentSticker';
import { StickerCocktail } from '../../../types/box-brand/additions/sticker';

interface InputFieldSentStickersProps {
  name: string;
  stickerCocktailSelected: Partial<StickerCocktail>[];
  showNumberInput?: boolean;
  unit?: string;
}

const InputFieldSentStickers: React.FC<InputFieldSentStickersProps> = ({
  name,
  stickerCocktailSelected = [],
  showNumberInput,
  unit,
}) => {
  return (
    <FieldArray name={name}>
      {() => (
        <Flex flexDirection='column' gap={3}>
          {stickerCocktailSelected.map((stickerCocktailPart, index) => (
            <InputFieldSentSticker
              key={index}
              name={`${name}[${index}].quantity`}
              stickerSelected={stickerCocktailPart}
              quantity={Number(stickerCocktailPart.quantity)}
              showNumberInput={showNumberInput}
              unit={unit}
            />
          ))}
        </Flex>
      )}
    </FieldArray>
  );
};

export default InputFieldSentStickers;
