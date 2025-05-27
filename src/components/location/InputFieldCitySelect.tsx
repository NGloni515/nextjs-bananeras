import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import CitySelectBase from './CitySelectBase';

interface InputFieldCitySelectProps {
  name: string;
  label: string;
  placeholder: string;
  provinceId?: number;
  resetOnParentChange?: boolean;
}

const InputFieldCitySelect: React.FC<InputFieldCitySelectProps> = ({
  name,
  label,
  placeholder,
  provinceId,
  resetOnParentChange = true,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h={'21px'}>
        {label}
      </FormLabel>

      <CitySelectBase
        provinceId={provinceId}
        name={name}
        placeholder={placeholder}
        field={field}
        resetOnParentChange={resetOnParentChange}
        onChange={(newValue) => helpers.setValue(newValue?.id || '')}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldCitySelect;
