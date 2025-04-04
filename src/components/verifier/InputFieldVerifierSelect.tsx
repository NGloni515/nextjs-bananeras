import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import VerifierSelectBase from './VerifierSelectBase';
import { VerifierResponse } from '../../types/verifier/verifier.response';

interface InputFieldVerifierSelectProps {
    name: string;
    label: string;
    placeholder: string;
    setVerifier?: (verifier: Partial<VerifierResponse>) => void;
}

const InputFieldVerifierSelect: React.FC<InputFieldVerifierSelectProps> = ({
    name,
    label,
    placeholder,
    setVerifier,
}) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
            <FormLabel fontSize='sm' mb='8px'>
                {label}
            </FormLabel>

            <VerifierSelectBase
                name={name}
                placeholder={placeholder}
                onChange={(newValue) => helpers.setValue(newValue?.id)}
                field={field}
                setVerifier={setVerifier}
            />

            {meta.error && meta.touched && (
                <FormErrorMessage mt='8px' mb='16px'>
                    {meta.error}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default InputFieldVerifierSelect;
