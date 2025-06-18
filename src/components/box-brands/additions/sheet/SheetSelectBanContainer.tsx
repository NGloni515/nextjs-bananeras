import {
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import { FieldArray } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaBan } from 'react-icons/fa';
import SelectSheet from './SelectSheet';
import { SheetProps } from '../../AddBoxBrandsForm';

interface Props {
  name: string;
  sheets: SheetProps[];
}

const SelectSheetBanContainer = ({
  name,
  sheets,
}: Props): React.JSX.Element => {
  const [isBan, setIsBan] = useState(false);
  const [firstChange, setFirstChange] = useState(false);

  useEffect(() => {
    if (isBan && !firstChange) {
      setFirstChange(true);
    }
  }, [isBan, firstChange]);

  const setBanState = (): void => {
    setIsBan((prevState) => !prevState);
  };

  return (
    <>
      <Heading fontSize={'xl'} p={'12px'}>
        Hojas{' '}
        {
          <IconButton
            isRound={true}
            ml={'5px'}
            colorScheme={!!isBan ? 'orange' : 'gray'}
            aria-label='Ban'
            size={'base'}
            variant={'outline'}
            icon={<FaBan size={'20px'} />}
            onClick={setBanState}
          />
        }
      </Heading>
      <Divider mb={'16px'} />
      <FieldArray name={name}>
        {({ push, remove }) => (
          <>
            {sheets.map((_sheet, index) => {
              isBan && remove(index);

              return (
                <div key={index}>
                  <SelectSheet
                    key={index}
                    name1={`${name}[${index}].sheetId`}
                    name2={`${name}[${index}].quantity`}
                    isDisabledRemove={sheets.length === 1}
                    onClickRemove={() => {
                      remove(index);
                    }}
                  />
                  <Divider
                    mt={'16px'}
                    mb={'8px'}
                    borderWidth={'2px'}
                    variant={'dashed'}
                  />
                </div>
              );
            })}
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <Box></Box>
              <Button
                isDisabled={isBan}
                onClick={() => push({ sheetId: '', quantity: '' })}
              >
                Agregar Hojas
              </Button>
            </SimpleGrid>
          </>
        )}
      </FieldArray>
    </>
  );
};

export default SelectSheetBanContainer;
