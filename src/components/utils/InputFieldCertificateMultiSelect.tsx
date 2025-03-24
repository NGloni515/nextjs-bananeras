import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import CertificateMultiSelectBase from './CertificateMultiSelectBase';
import { Certificate } from '../../types/utils/certificate';
import AddCertificateModal from '../box-brands/specifications/requiredCertificate/AddRequiredCertificateModal';

interface InputFieldCertificateMultiSelectProps {
    name: string;
    label: string;
    placeholder: string;
    setCertificates?: (certificates: Partial<Certificate>[]) => void;
}

const InputFieldCertificateMultiSelect: React.FC<
    InputFieldCertificateMultiSelectProps
> = ({ name, label, placeholder, setCertificates }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
            <FormLabel fontSize='sm' mb='8px'>
                {label} <AddCertificateModal />
            </FormLabel>

            <CertificateMultiSelectBase
                name={name}
                placeholder={placeholder}
                onChange={(newValues) =>
                    helpers.setValue(
                        newValues.map((item: Partial<Certificate>) => item.id)
                    )
                }
                field={field}
                setCertificates={setCertificates}
            />

            {meta.error && meta.touched && (
                <FormErrorMessage mt='8px' mb='16px'>
                    {meta.error}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default InputFieldCertificateMultiSelect;
