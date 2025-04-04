import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import CertificationMultiSelectBase from './CertificationMultiSelectBase';

export interface Certification {
    id: number;
    name: string;
}

interface InputFieldCertificationMultiSelectProps {
    name: string;
    label: string;
    placeholder: string;
    setCertifications?: (certificates: Partial<Certification>[]) => void;
}

const InputFieldCertificationMultiSelect: React.FC<
    InputFieldCertificationMultiSelectProps
> = ({ name, label, placeholder, setCertifications }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
            <FormLabel fontSize='sm' mb='8px'>
                {label}
            </FormLabel>

            <CertificationMultiSelectBase
                name={name}
                placeholder={placeholder}
                onChange={(newValues) =>
                    helpers.setValue(
                        newValues.map((item: Partial<Certification>) => item.id)
                    )
                }
                field={field}
                setCertifications={setCertifications}
            />

            {meta.error && meta.touched && (
                <FormErrorMessage mt='8px' mb='16px'>
                    {meta.error}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default InputFieldCertificationMultiSelect;
