import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

interface DisplayFieldProps {
    label: string;
    value: string | undefined;
}

const DisplayField: React.FC<DisplayFieldProps> = ({ label, value }) => {
    return (
        <FormControl>
            <FormLabel fontSize="sm" mb={1}>
                {label}
            </FormLabel>
            <Input value={value || ''} isReadOnly />
        </FormControl>
    );
};

export default DisplayField;
