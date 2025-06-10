import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';

interface InputFieldDateTimeProps {
  name: string;
  label?: string;
  placeholder?: string;
  flexDirection?: 'column' | 'row';
  isReadOnly?: boolean;
}

const InputFieldDateTime: React.FC<InputFieldDateTimeProps> = ({
  name,
  label,
  placeholder,
  flexDirection = 'column',
  isReadOnly = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const formatDateTime = (date: Date): string => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  };

  const [dateTimeValue, setDateTimeValue] = useState<string>(
    field.value ? formatDateTime(new Date(field.value)) : ''
  );

  useEffect(() => {
    if (field.value) {
      const adjustedDate = new Date(field.value);
      adjustedDate.setMinutes(
        adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset()
      );
      setDateTimeValue(formatDateTime(adjustedDate));
    } else {
      setDateTimeValue('');
    }
  }, [field.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value) {
      const newDate = new Date(e.target.value);
      newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
      helpers.setValue(newDate.toISOString());
      setDateTimeValue(e.target.value);
    } else {
      helpers.setValue('');
      setDateTimeValue('');
    }
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <Flex flexDirection={flexDirection}>
        {label && (
          <FormLabel fontSize='sm' mb='8px'>
            {label}
          </FormLabel>
        )}
        <Input
          {...field}
          value={dateTimeValue}
          onChange={handleChange}
          placeholder={placeholder || label}
          type={'datetime-local'}
          isReadOnly={isReadOnly}
        />
      </Flex>

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldDateTime;
