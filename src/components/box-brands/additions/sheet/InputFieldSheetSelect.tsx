import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddSheetModal from './AddSheetModal';
import SheetSelectBase from './SheetSelectBase';
import { SheetType } from '../../../../types/box-brand/additions/sheet';

interface InputFieldSheetSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setSheet?: (pesticide: Partial<SheetType>) => void;
}

const InputFieldSheetSelect: React.FC<InputFieldSheetSelectProps> = ({
  name,
  label,
  placeholder,
  setSheet,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h={'21px'}>
        {label} <AddSheetModal />
      </FormLabel>

      <SheetSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setSheet={setSheet}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldSheetSelect;
