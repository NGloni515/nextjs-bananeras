import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import ClientByHarborSelectBase from './ClientByHarborSelectBase';
import ClientSelectBase from './ClientSelectBase';
import { ClientType } from '../../types/client';

interface InputFieldClientSelectProps {
  name: string;
  label: string;
  placeholder: string;
  harbor?: number;
  isHarbor?: boolean;
  setClient?: (client: Partial<ClientType>) => void;
}

const InputFieldClientSelect: React.FC<InputFieldClientSelectProps> = ({
  name,
  label,
  placeholder,
  harbor,
  isHarbor,
  setClient,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>

      {isHarbor && (
        <ClientByHarborSelectBase
          name={name}
          placeholder={placeholder}
          onChange={(newValue) => helpers.setValue(newValue?.id)}
          field={field}
          setClient={setClient}
          harbor={harbor}
        />
      )}

      {!isHarbor && (
        <ClientSelectBase
          name={name}
          placeholder={placeholder}
          onChange={(newValue) => helpers.setValue(newValue?.id)}
          field={field}
          setClient={setClient}
        />
      )}

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldClientSelect;
