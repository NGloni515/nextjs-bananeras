import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import DepositSelectBase from './DepositSelectBase';
import { DepositResponse } from '../../types/deposit/deposit.response';

interface InputFieldDepositSelectProps {
    name: string;
    label: string;
    placeholder: string;
    setDeposit?: (deposit: Partial<DepositResponse>) => void;
}

const InputFieldDepositSelect: React.FC<InputFieldDepositSelectProps> = ({
    name,
    label,
    placeholder,
    setDeposit,
}) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
            <FormLabel fontSize='sm' mb='8px'>
                {label}
            </FormLabel>

            <DepositSelectBase
                name={name}
                placeholder={placeholder}
                onChange={(newValue) => helpers.setValue(newValue?.id)}
                field={field}
                setDeposit={setDeposit}
            />

            {meta.error && meta.touched && (
                <FormErrorMessage mt='8px' mb='16px'>
                    {meta.error}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default InputFieldDepositSelect;
