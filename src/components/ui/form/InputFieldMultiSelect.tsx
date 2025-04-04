'use client';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import MultiSelectBase, { Option } from './MultiSelectBase';

interface InputFieldMultiSelectProps {
    name: string;
    label: string;
    placeholder: string;
    options: Option[];
}

const InputFieldMultiSelect: React.FC<InputFieldMultiSelectProps> = ({
    name,
    label,
    placeholder,
    options,
}) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl id={name} isInvalid={!!meta.error && meta.touched} mt="10px">
            <FormLabel fontSize="sm" mb="8px">
                {label}
            </FormLabel>
            <MultiSelectBase
                name={name}
                field={field}
                placeholder={placeholder}
                options={options}
                onChange={(newValues: Option[]) =>
                    helpers.setValue(newValues.map((item) => item.value))
                }
            />
            {meta.error && meta.touched && (
                <FormErrorMessage mt="8px" mb="16px">
                    {meta.error}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default InputFieldMultiSelect;
