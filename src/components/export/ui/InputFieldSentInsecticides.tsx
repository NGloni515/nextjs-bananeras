import { Flex } from '@chakra-ui/react';
import { FieldArray } from 'formik';
import React from 'react';
import InputFieldSentInsecticide from './InputFieldSentInsecticide';
import { InsecticideCocktailPart } from '../../../types/box-brand/additions/insecticideCocktailPart';

interface InputFieldSentInsecticidesProps {
  name: string;
  insecticideCocktailSelected: Partial<InsecticideCocktailPart>[];
}

const InputFieldSentInsecticides: React.FC<InputFieldSentInsecticidesProps> = ({
  name,
  insecticideCocktailSelected,
}) => {
  return (
    <FieldArray name={name}>
      {() => (
        <Flex flexDirection='column' gap={3}>
          {insecticideCocktailSelected.map((insecticideCocktailPart, index) => (
            <InputFieldSentInsecticide
              key={index}
              name={`${name}[${index}].quantity`}
              insecticideSelected={insecticideCocktailPart}
              quantity={Number(insecticideCocktailPart.quantity)}
            />
          ))}
        </Flex>
      )}
    </FieldArray>
  );
};

export default InputFieldSentInsecticides;