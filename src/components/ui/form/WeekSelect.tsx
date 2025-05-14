'use client';

import { Icon } from '@chakra-ui/react';
import {
  Select as ChakraSelect,
  chakraComponents,
  ChakraStylesConfig,
  DropdownIndicatorProps,
  GroupBase,
  CSSObjectWithLabel,
  SingleValue,
} from 'chakra-react-select';
import { FaAngleDown } from 'react-icons/fa6';

interface WeekOption {
  label: string;
  value: number;
}

interface WeekSelectProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

const weeksOptions: WeekOption[] = Array.from({ length: 52 }, (_, i) => ({
  label: `Semana ${i + 1}`,
  value: i + 1,
}));

const chakraStyles: ChakraStylesConfig<
  WeekOption,
  false,
  GroupBase<WeekOption>
> = {
  container: (provided) => ({
    ...provided,
    w: 'full',
  }),
  option: (provided) => ({
    ...provided,
    borderBottom: '1px solid',
    borderColor: 'gray.200',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray.600',
  }),
  input: (provided) => ({
    ...provided,
    color: 'gray.900',
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: '200px',
  }),
};

const components = {
  DropdownIndicator: (
    props: DropdownIndicatorProps<WeekOption, false, GroupBase<WeekOption>>
  ): React.JSX.Element => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={FaAngleDown} boxSize='14px' />
    </chakraComponents.DropdownIndicator>
  ),
};

export default function WeekSelect({
  value,
  onChange,
  placeholder = 'Filtrar por semana',
}: WeekSelectProps): JSX.Element {
  const selectedOption = weeksOptions.find((opt) => opt.value === value);

  const handleChange = (option: SingleValue<WeekOption>): void => {
    if (option) onChange(option.value);
  };

  return (
    <ChakraSelect
      useBasicStyles
      isSearchable={false}
      options={weeksOptions}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
      chakraStyles={chakraStyles}
      components={components}
      menuPortalTarget={
        typeof window !== 'undefined' ? document.body : undefined
      }
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 100 }) as CSSObjectWithLabel,
      }}
    />
  );
}
