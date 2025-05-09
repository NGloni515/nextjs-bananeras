'use client';

import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';

interface InputFieldProps {
  name: string;
  label?: string;
  value?: number | '';
  placeholder?: string;
  isReadOnly?: boolean;
  isDecimal?: boolean;
  isDolar?: boolean;
  isGeo?: boolean;
  unit?: string;
  size?: string;
  flexDirection?: 'column' | 'row';
}

const InputFieldNumber: React.FC<InputFieldProps> = ({
  name,
  label,
  value = '',
  placeholder,
  isReadOnly = false,
  isDecimal = false,
  isDolar = false,
  isGeo = false,
  unit,
  size = 'md',
  flexDirection = 'column',
}) => {
  const [, meta, helpers] = useField(name);
  const [internalValue, setInternalValue] = useState<string>('');

  useEffect(() => {
    if (value !== '') {
      const formatted =
        isDecimal || isGeo
          ? Number(value).toFixed(isGeo ? 6 : 2)
          : String(value);
      setInternalValue(formatted);
      helpers.setValue(Number(formatted));
    } else {
      setInternalValue('');
      helpers.setValue('');
    }
  }, [helpers, isDecimal, isGeo, value]);

  const handleBlur = (): void => {
    const parsed = parseFloat(internalValue);
    if (!isNaN(parsed)) {
      const formatted = isGeo
        ? parsed.toFixed(6)
        : isDecimal
          ? parsed.toFixed(2)
          : parsed.toString();
      setInternalValue(formatted);
      helpers.setValue(Number(formatted));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const valueStr = e.target.value;
    setInternalValue(valueStr);

    if (
      valueStr === '' ||
      valueStr === '-' ||
      valueStr === '--' ||
      valueStr === '-.' ||
      valueStr === '.' ||
      valueStr === ','
    ) {
      helpers.setValue('');
    } else if (!isNaN(Number(valueStr))) {
      helpers.setValue(Number(valueStr));
    }
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched} w='100%'>
      <Flex
        flexDirection={flexDirection}
        alignItems={flexDirection === 'row' ? 'center' : 'flex-start'}
        w='100%'
      >
        {label && (
          <Flex
            flex={flexDirection === 'row' ? '1' : 'none'}
            minW={flexDirection === 'row' ? '15%' : '100%'}
            maxW={flexDirection === 'row' ? '25%' : '100%'}
            alignItems='center'
            marginRight={flexDirection === 'row' ? '2%' : '0'}
          >
            <FormLabel
              fontSize='sm'
              mb={flexDirection === 'column' ? '8px' : '0'}
              m={0}
              overflow='hidden'
            >
              <Text>{label}</Text>
            </FormLabel>
          </Flex>
        )}
        <Flex flex={label ? '2' : '1'} w='100%'>
          <InputGroup w='100%'>
            {isDolar && (
              <InputLeftElement
                pointerEvents='none'
                color='gray.400'
                fontSize='1.2em'
              >
                $
              </InputLeftElement>
            )}
            {unit && (
              <InputRightElement
                pointerEvents='none'
                color='gray.500'
                fontSize='1em'
                mr='8px'
              >
                {unit}
              </InputRightElement>
            )}
            <Input
              type='text'
              inputMode='decimal'
              isReadOnly={isReadOnly}
              placeholder={placeholder || label}
              textAlign={isDecimal && !isGeo ? 'right' : 'left'}
              size={size}
              value={internalValue}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
        </Flex>
      </Flex>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldNumber;
