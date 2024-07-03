import { Flex } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import React from 'react';
import InputFieldSentPesticide from './InputFieldSentPesticide';
import { PesticideCocktailPart } from '../../../types/box-brand/post-harvest/pesticideCocktailPart';

interface InputFieldSentPesticidesProps {
  name: string;
  pesticideCocktailSelected: Partial<PesticideCocktailPart>[];
}

const InputFieldSentPesticides: React.FC<InputFieldSentPesticidesProps> = ({
  name,
  pesticideCocktailSelected = [],
}) => {
  return (
    <FieldArray name={name}>
      {() => (
        <Flex flexDirection='column' gap={3}>
          {pesticideCocktailSelected.map((pesticideCocktailPart, index) => (
            <InputFieldSentPesticide
              key={index}
              name={`${name}[${index}].quantity`}
              pesticideSelected={pesticideCocktailPart}
              quantity={Number(pesticideCocktailPart.quantity)}
            />
          ))}
        </Flex>
      )}
    </FieldArray>
  );
};

export default InputFieldSentPesticides;