import { Badge, Box, Button, Flex, Icon, Link, Text } from '@chakra-ui/react';
import Link_Next from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { SidenavItem } from './sidenav-items';

interface AccordionMenuProps {
  item: SidenavItem;
}

export const AccordionMenu = ({
  item,
}: AccordionMenuProps): React.JSX.Element => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(pathname.includes(item.to));

  const isAble: boolean = pathname !== '/dashboard/onboarding';

  const toggleAccordion = (): void => {
    setIsOpen(!isOpen);
  };

  const renderBadge = (count?: number): React.JSX.Element | null => {
    if (count && count > 0) {
      return (
        <Badge colorScheme='red' ml='auto' mr={2.5}>
          {count}
        </Badge>
      );
    }
    return null;
  };

  return (
    <>
      <Button
        onClick={toggleAccordion}
        px='10px'
        py='12px'
        _hover={{
          bg: 'green.300',
          color: 'white',
        }}
        bgColor={isOpen ? 'green.300' : 'transparent'}
        color={isOpen ? 'white' : 'black'}
        borderRadius='md'
        w={'full'}
        display={'flex'}
        justifyContent={'space-between'}
        h={'48px'}
      >
        <Flex align='center'>
          <Icon as={item.icon} boxSize='16px' />
          <Flex ml={2} align='center' justify='between' w='full'>
            <Text fontSize='md'>{item.label}</Text>
          </Flex>
        </Flex>
        {renderBadge(item.count)}
        <Icon as={isOpen ? IoIosArrowDown : IoIosArrowForward} />
      </Button>
      {isOpen &&
        item.menu?.map((menuItem, index) => (
          <Box key={index}>
            <Link
              display="block"
              as={Link_Next}
              href={isAble ? menuItem.to : ''}
              w="full"
              borderRadius="md"
              color={pathname === menuItem.to ? 'green.800' : 'black'}
            >
              <Flex alignItems="center" justifyContent="start" h="48px" p="0" pl="8px">
                <Box
                  bg={pathname.includes(menuItem.to) ? 'green.300' : 'green.100'}
                  w="3px"
                  h="100%"
                  rounded="base"
                />
                <Text ml={2}>{menuItem.label}</Text>
                {renderBadge(menuItem.count)}
              </Flex>
            </Link>
            {menuItem.submenu &&
              menuItem.submenu.map((subItem, subIndex) => (
                <Link
                  key={`${index}-${subIndex}`}
                  display="block"
                  as={Link_Next}
                  href={isAble ? subItem.to : ''}
                  w="full"
                  borderRadius="md"
                  color={pathname === subItem.to ? 'green.800' : 'black'}
                >
                  <Flex
                    alignItems="center"
                    justifyContent="start"
                    h="48px"
                    p="0"
                    pl="32px"
                  >
                    <Box
                      h="40%"
                      rounded="base"
                    />
                    <Text ml={2}>{subItem.label}</Text>
                    {renderBadge(subItem.count)}
                  </Flex>
                </Link>
              ))}
          </Box>
        ))}
    </>
  );
};
