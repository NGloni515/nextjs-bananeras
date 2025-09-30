'use client';

import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { MdOutlineNotifications } from 'react-icons/md';
import { useNotifications } from '../../../hooks/useNotifications';

const formatCount = (n: number): string => (n > 99 ? '99+' : n.toString());

const MenuNotification = (): React.JSX.Element => {
  const { notifications, isLoading } = useNotifications();
  const btnBg = useColorModeValue('green.500', 'green.500');

  const listBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textPrimary = useColorModeValue('gray.800', 'gray.100');
  const textSecondary = useColorModeValue('gray.500', 'gray.400');
  const hoverRow = useColorModeValue('gray.50', 'gray.700');
  const shadowColor = useColorModeValue('rgba(0,0,0,0.12)', 'rgba(0,0,0,0.4)');

  if (isLoading) {
    return (
      <SkeletonCircle
        startColor='teal.500'
        endColor='teal.800'
        size='12'
        mr='8px'
      />
    );
  }

  const total = notifications.length;

  return (
    <Menu placement='bottom-end' autoSelect={false}>
      <MenuButton
        as={IconButton}
        aria-label='Abrir notificaciones'
        variant='solid'
        bg={btnBg}
        h='50px'
        w='50px'
        rounded='full'
        mr='8px'
        _hover={{
          bg: 'green.600',
          transform: 'scale(1.05)',
          boxShadow: `0 4px 12px rgba(34, 197, 94, 0.4)`,
        }}
        _active={{
          bg: 'green.700',
          transform: 'scale(0.95)',
        }} transition='all 0.2s ease'
        border='2px solid'
        borderColor='green.400'
        icon={
          <Avatar
            bg='transparent'
            h='50px'
            w='50px'
            rounded='full'
            icon={<MdOutlineNotifications size='24px' />}
            color='white'
          >
            {total > 0 && (
              <AvatarBadge
                bg='red.500'
                boxSize='1.5em'
                borderColor={listBg}
              >
                <Text fontSize='xs' fontWeight='bold' color='white'>
                  {formatCount(total)}
                </Text>
              </AvatarBadge>
            )}
          </Avatar>
        }
      />

      <MenuList
        minW='360px'
        bg={listBg}
        border='1px solid'
        borderColor={borderColor}
        borderRadius='xl'
        boxShadow={`0 24px 48px ${shadowColor}`}
        p='0'
        overflow='hidden'
      >
        <Box
          position='sticky'
          top='0'
          zIndex={1}
          bg={listBg}
          borderBottom='1px solid'
          borderColor={borderColor}
          px='16px'
          py='12px'
        >
          <Flex align='center' justify='space-between'>
            <Heading as='h4' fontSize='md' color={textPrimary}>
              Notificaciones
            </Heading>
            <Badge
              colorScheme={total > 0 ? 'red' : 'green'}
              borderRadius='full'
              px={3}
              py={1}
            >
              {total} pendiente{total === 1 ? '' : 's'}
            </Badge>
          </Flex>
        </Box>

        <Box
          maxH='60vh'
          overflowY='auto'
          py='6px'
          css={{
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: 'var(--chakra-colors-gray-300)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'var(--chakra-colors-gray-400)',
            },
          }}
        >
          {total > 0 ? (
            notifications.map((n, i) => (
              <MenuItem
                key={i}
                as='a'
                href={n.href}
                alignItems='flex-start'
                px='12px'
                py='10px'
                mx='6px'
                borderRadius='lg'
                transition='all 0.2s ease'
                _hover={{
                  bg: hoverRow,
                  transform: 'translateX(4px)',
                }}
              >
                <Flex w='full' gap={3}>
                  <Box
                    mt='6px'
                    minW='8px'
                    h='8px'
                    borderRadius='full'
                    bg='green.400'
                  />
                  <Box flex='1' minW={0}>
                    <Text
                      fontWeight='semibold'
                      color={textPrimary}
                      noOfLines={2}
                    >
                      {n.message}
                    </Text>
                    {n.detail && (
                      <Text fontSize='sm' color={textSecondary} noOfLines={2}>
                        {n.detail}
                      </Text>
                    )}
                  </Box>
                </Flex>
              </MenuItem>
            ))
          ) : (
            <>
              <MenuDivider borderColor={borderColor} />
              <Flex direction='column' align='center' py='28px' gap={2}>
                <Icon as={MdOutlineNotifications} boxSize='28px' color={textSecondary} />
                <Heading as='h5' fontSize='sm' color={textPrimary}>
                  Sin notificaciones
                </Heading>
                <Text fontSize='sm' color={textSecondary}>
                  ¡Estás al día!
                </Text>
              </Flex>
            </>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
};

export default MenuNotification;
