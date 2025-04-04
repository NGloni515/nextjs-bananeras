import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
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
    <FormControl
      id={name}
      isInvalid={!!meta.error && meta.touched}
      width="100%"
    >
      {label && (
        <FormLabel fontSize="sm" mb="8px">
          {label}
        </FormLabel>
      )}
      <InputGroup width="100%">
        {isDolar && (
          <InputLeftElement
            pointerEvents="none"
            color="gray.400"
            fontSize="1.2em"
          >
            $
          </InputLeftElement>
        )}
        {unit && (
          <InputRightElement
            pointerEvents="none"
            color="gray.500"
            fontSize="1em"
            mr="8px"
          >
            {unit}
          </InputRightElement>
        )}
        <Input
          type="text"
          inputMode="decimal"
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
      {meta.error && meta.touched && (
        <FormErrorMessage mt="8px" mb="16px">
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldNumber;
