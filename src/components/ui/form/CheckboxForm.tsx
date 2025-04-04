import { Checkbox, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface CheckboxProps {
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxForm: React.FC<CheckboxProps> = ({ name, label, onChange, ...props }) => {
  const [field, meta] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    field.onChange(e);
    if (onChange) onChange(e);
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <Checkbox {...field} onChange={handleChange} colorScheme="teal" {...props}>
        {label}
      </Checkbox>
      {meta.error && meta.touched && (
        <FormErrorMessage mt="8px" mb="16px">
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CheckboxForm;
