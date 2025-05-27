import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import CountrySelectBase from './CountrySelectBase';
import { Country } from '../../types/location/country';

interface InputFieldCountrySelectProps {
  name: string;
  label: string;
  placeholder: string;
  onChange?: (newValue: Country | null) => void;
}

const InputFieldCountrySelect: React.FC<InputFieldCountrySelectProps> = ({
  name,
  label,
  placeholder,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h={'21px'}>
        {label}
      </FormLabel>

      <CountrySelectBase
        name={name}
        placeholder={placeholder}
        field={field}
        onChange={(newValue) => {
          helpers.setValue(newValue?.id || '');
          onChange?.(newValue || null);
        }}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldCountrySelect;
