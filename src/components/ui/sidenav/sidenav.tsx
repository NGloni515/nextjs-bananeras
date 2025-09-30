'use client';

import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  DrawerBody,
  Icon,
  Text,
  Flex,
  Center,
  Box,
  useColorModeValue,
  IconButton,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSidenav } from './sidenav-context';
import SidenavItems, { SidenavItem } from './sidenav-items';
import { useExporter } from '../../../hooks/useUserProfile';
import { Logo } from '../Logo';

export interface SidenavProps {
  navItems: SidenavItem[];
}

export function Sidenav({ navItems }: SidenavProps): React.JSX.Element {
  const { isOpen, onClose } = useSidenav();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const { user, isLoading } = useExporter();

  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const brandColor = useColorModeValue('green.500', 'green.300');

  const businessName = user?.exporterDetails?.businessName || 'Exportmétricas';

  const handleLogoClick = (): void => {
    router.push('/dashboard');
    if (isOpen) onClose();
  };

  const toggleCollapse = (): void => setIsCollapsed((v) => !v);

  return (
    <React.Fragment>
      {/* DESKTOP */}
      <VStack
        spacing='0'
        as='nav'
        display={{ base: 'none', md: 'flex' }}
        alignItems='flex-start'
        position='relative'
      >
        {/* Header fijo con logo y toggle */}
        <Flex
          p='20px'
          w='full'
          h='100px'
          pos='fixed'
          top='0'
          left='0'
          zIndex='999'
          bg={bg}
          borderBottom='1px solid'
          borderColor={borderColor}
          alignItems='center'
          justifyContent='space-between'
          boxShadow='sm'
        >
          <Box
            cursor='pointer'
            onClick={handleLogoClick}
            display='flex'
            alignItems='center'
            transition='all 0.2s ease'
            _hover={{ transform: 'scale(1.05)' }}
          >
            <SkeletonCircle
              isLoaded={!isLoading}
              startColor='teal.500'
              endColor='teal.800'
              size='10'
              mr='8px'
            >
              <Icon as={Logo} boxSize={8} />
            </SkeletonCircle>

            {!isCollapsed && (
              <Center ml='12px'>
                <Skeleton isLoaded={!isLoading} startColor='teal.500' endColor='teal.800'>
                  <Text fontSize='2xl' fontWeight='bold' color={brandColor}>
                    {businessName}
                  </Text>
                </Skeleton>
              </Center>
            )}
          </Box>

          {/* Botón colapsar/expandir */}
          <IconButton
            aria-label='Toggle sidebar'
            icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            size='sm'
            variant='ghost'
            onClick={toggleCollapse}
            color='gray.500'
            _hover={{ bg: 'green.50', color: 'green.600' }}
          />
        </Flex>

        {/* Contenido del sidebar (colapsable) */}
        <Box
          w={isCollapsed ? '80px' : 'full'}
          transition='width 0.3s ease'
          overflow='hidden'
        >
          {/* SidenavItems debe ajustar paddings para el header fijo (top ~100px) */}
          <SidenavItems navItems={navItems} isCollapsed={isCollapsed} />
        </Box>
      </VStack>

      {/* MÓVIL: Drawer */}
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='sm'>
        <DrawerOverlay backdropFilter='blur(4px)' />
        <DrawerContent>
          <DrawerCloseButton
            top='20px'
            right='20px'
            color='gray.500'
            _hover={{ bg: 'red.50', color: 'red.600' }}
          />
          <DrawerHeader py='20px' borderBottom='1px solid' borderColor={borderColor}>
            <Flex
              cursor='pointer'
              onClick={handleLogoClick}
              alignItems='center'
              transition='all 0.2s ease'
              _hover={{ transform: 'scale(1.05)' }}
            >
              <SkeletonCircle
                isLoaded={!isLoading}
                startColor='teal.500'
                endColor='teal.800'
                size='10'
                mr='8px'
              >
                <Icon as={Logo} boxSize={8} />
              </SkeletonCircle>
              <Center ml='12px'>
                <Skeleton isLoaded={!isLoading} startColor='teal.500' endColor='teal.800'>
                  <Text fontSize='2xl' fontWeight='bold' color={brandColor}>
                    {businessName}
                  </Text>
                </Skeleton>
              </Center>
            </Flex>
          </DrawerHeader>

          <DrawerBody p='0'>
            {/* En móvil no colapsamos; pasamos prop para compatibilidad y/o modo "over" si tu lista lo usa */}
            <SidenavItems navItems={navItems} isCollapsed={false} mode='over' />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidenav;