import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import TransportSelectBase from './TransportSelectBase';
import { TransportResponse } from '../../types/transport/transport.response';

interface InputFieldTransportSelectProps {
    name: string;
    label: string;
    placeholder: string;
    setTransport?: (transport: Partial<TransportResponse>) => void;
}

const InputFieldTransportSelect: React.FC<InputFieldTransportSelectProps> = ({
    name,
    label,
    placeholder,
    setTransport,
}) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
            <FormLabel fontSize='sm' mb='8px'>
                {label}
            </FormLabel>

            <TransportSelectBase
                name={name}
                placeholder={placeholder}
                onChange={(newValue) => helpers.setValue(newValue?.id)}
                field={field}
                setTransport={setTransport}
            />

            {meta.error && meta.touched && (
                <FormErrorMessage mt='8px' mb='16px'>
                    {meta.error}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default InputFieldTransportSelect;
