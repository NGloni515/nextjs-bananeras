import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import IncotermMultiSelectBase, { IncotermType } from './IncotermMultiSelectBase';

interface InputFieldIncotermMultiSelectProps {
    name: string;
    label: string;
    placeholder: string;
    setIncoterms?: (incoterms: Partial<IncotermType>[]) => void;
}

const InputFieldIncotermMultiSelect: React.FC<
    InputFieldIncotermMultiSelectProps
> = ({ name, label, placeholder, setIncoterms }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
            <FormLabel fontSize='sm' mb='8px'>
                {label}
            </FormLabel>

            <IncotermMultiSelectBase
                name={name}
                placeholder={placeholder}
                onChange={(newValues) =>
                    helpers.setValue(
                        newValues.map((item: Partial<IncotermType>) => item.id)
                    )
                }
                field={field}
                setIncoterms={setIncoterms}
            />

            {meta.error && meta.touched && (
                <FormErrorMessage mt='8px' mb='16px'>
                    {meta.error}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default InputFieldIncotermMultiSelect;
