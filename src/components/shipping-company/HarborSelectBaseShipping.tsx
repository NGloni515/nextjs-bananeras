import { Icon } from '@chakra-ui/react';
import {
    ChakraStylesConfig,
    DropdownIndicatorProps,
    Select as ChakraSelect,
    GroupBase,
    SingleValue,
    chakraComponents,
    CSSObjectWithLabel,
} from 'chakra-react-select';
import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { HarborType } from '../../types/harbor';

interface HarborSelectBaseShippingProps {
    name: string;
    placeholder: string;
    type: 'departure' | 'destination';
    shippingCompany?: Partial<{
        departureHarbors: Array<{ harbor: HarborType }>;
        destinationHarbors: Array<{ harbor: HarborType }>;
    }> | null;
    onChange: (newValue: Partial<HarborType> | null) => void;
    setHarbor?: (harbor: Partial<HarborType>) => void;
}

const chakraStyles: ChakraStylesConfig<Partial<HarborType>, false, GroupBase<Partial<HarborType>>> = {
    container: (provided) => ({ ...provided, w: 'full' }),
    placeholder: (provided) => ({ ...provided, color: 'gray.600' }),
    input: (provided) => ({ ...provided, color: 'gray.900' }),
    option: (provided) => ({
        ...provided,
        borderBottom: '1px solid',
        borderColor: 'gray.200',
    }),
};

const harborComponents = {
    DropdownIndicator: (
        props: DropdownIndicatorProps<Partial<HarborType>, false, GroupBase<Partial<HarborType>>>
    ): JSX.Element => (
        <chakraComponents.DropdownIndicator {...props}>
            <Icon as={MdOutlineArrowDropDownCircle} size="13px" />
        </chakraComponents.DropdownIndicator>
    ),
};

const HarborSelectBaseShipping: React.FC<HarborSelectBaseShippingProps> = ({
    name,
    placeholder,
    type,
    shippingCompany,
    onChange,
    setHarbor,
}) => {
    let options: Partial<HarborType>[] = [];
    if (shippingCompany) {
        if (type === 'departure' && shippingCompany.departureHarbors) {
            options = shippingCompany.departureHarbors.map((item) => item.harbor);
        } else if (type === 'destination' && shippingCompany.destinationHarbors) {
            options = shippingCompany.destinationHarbors.map((item) => item.harbor);
        }
    }

    const handleChange = (newValue: SingleValue<Partial<HarborType>>): void => {
        if (setHarbor && newValue) {
            setHarbor(newValue as Partial<HarborType>);
        }
        onChange(newValue);
    };

    return (
        <ChakraSelect
            name={name}
            menuPortalTarget={document.body}
            styles={{
                menuPortal: (provided) => ({ ...provided, zIndex: 100 }) as CSSObjectWithLabel,
            }}
            useBasicStyles
            chakraStyles={chakraStyles}
            noOptionsMessage={() => 'No hay puertos disponibles'}
            isLoading={false}
            options={options}
            getOptionLabel={(opt: Partial<HarborType>) => opt.name || ''}
            getOptionValue={(opt: Partial<HarborType>) => (opt.id ? opt.id.toString() : '')}
            onChange={(newValue) => handleChange(newValue)}
            placeholder={placeholder}
            components={harborComponents}
        />
    );
};

export default HarborSelectBaseShipping;
