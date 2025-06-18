import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface InputFieldProps {
  name: string;
  label: string;
}

const InputFieldPassword: React.FC<InputFieldProps> = ({ name, label }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (): void => setShowPassword((prev) => !prev);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          {...field}
          type={showPassword ? 'text' : 'password'}
          placeholder={label}
        />
        <InputRightElement>
          <IconButton
            size='md'
            variant='ghost'
            aria-label={
              showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
            icon={showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            onClick={toggleShowPassword}
          />
        </InputRightElement>
      </InputGroup>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldPassword;
