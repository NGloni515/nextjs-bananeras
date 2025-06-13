'use client';

import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Input,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  SimpleGrid,
  TableContainer,
  Heading,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useExporterMaterials } from '@/hooks/winery/getExporterMaterials';
import { ExporterMaterial } from '@/types/winery/exporterMateriales';
import { useExporter } from '../../hooks/useUserProfile';
import {
  MATERIAL_TYPE_LABELS,
  MATERIAL_TYPE_ORDER,
} from '../../utils/materialTypeLabels';

export function MaterialList(): JSX.Element {
  const { user, isLoading: isLoadingExporter } = useExporter();
  const exporterId = user?.exporterDetails?.id?.toString();
  const router = useRouter();

  const { data, isLoading, error } = useExporterMaterials({
    exporterId: exporterId ?? '',
  });

  const materials = useMemo(() => (data ?? []) as ExporterMaterial[], [data]);

  const [filterType, setFilterType] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const materialTypes = useMemo(() => {
    const unique = new Set(materials.map((m) => m.materialType));
    return Array.from(unique).sort();
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesType =
        filterType === 'ALL' || material.materialType === filterType;
      const matchesSearch = material.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [materials, filterType, search]);

  if (isLoadingExporter || isLoading) {
    return (
      <Center py={10}>
        Cargando Materiales <Spinner size='md' ml={4} />
      </Center>
    );
  }

  if (error) {
    return (
      <Center py={10}>
        <Text color='red.500'>Error al cargar los materiales</Text>
      </Center>
    );
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing='4' mb={4}>
        <Flex flex='1' align='center'>
          <Select
            placeholder='Filtrar por Tipo de Material'
            value={filterType === 'ALL' ? '' : filterType}
            onChange={(e) => setFilterType(e.target.value)}
            width='100%'
          >
            {MATERIAL_TYPE_ORDER.map((type) =>
              materialTypes.includes(type) ? (
                <option key={type} value={type}>
                  {MATERIAL_TYPE_LABELS[type] ?? type}
                </option>
              ) : null
            )}
          </Select>
          {filterType !== 'ALL' ? (
            <CloseButton
              onClick={() => setFilterType('ALL')}
              ml={2}
              size='sm'
              aria-label='Limpiar filtro de tipo'
            />
          ) : (
            <Box ml={2} width='20px' />
          )}
        </Flex>

        <Flex flex='1' align='center'>
          <Input
            placeholder='Buscar por nombre'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            width='100%'
          />
          {search ? (
            <CloseButton
              onClick={() => setSearch('')}
              ml={2}
              size='sm'
              aria-label='Limpiar búsqueda'
            />
          ) : (
            <Box ml={2} width='20px' />
          )}
        </Flex>
      </SimpleGrid>

      <TableContainer w='100%' overflowX='auto'>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th>
                <Heading size='sm' mb={2}>
                  Nombre
                </Heading>
              </Th>
              <Th pr={24}>
                <Heading size='sm' mb={2}>
                  ID
                </Heading>
              </Th>
              <Th>
                <Heading size='sm' mb={2}>
                  Tipo
                </Heading>
              </Th>
              <Th>
                <Heading size='sm' mb={2}>
                  Código
                </Heading>
              </Th>
              <Th textAlign={'center'}>
                <Heading size='sm' mb={2}>
                  Stock
                </Heading>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredMaterials.map((material) => (
              <Tr key={`${material.materialType}-${material.id}`}>
                <Td>{material.name}</Td>
                <Td>{material.id}</Td>
                <Td>
                  {MATERIAL_TYPE_LABELS[material.materialType] ??
                    material.materialType}
                </Td>
                <Td>{material.code}</Td>
                <Td>
                  <Flex justifyContent='center'>
                    <Button
                      size='sm'
                      colorScheme='teal'
                      onClick={() =>
                        router.push(
                          `/dashboard/winery/add-material/${material.materialType}-${material.id}`
                        )
                      }
                    >
                      Agregar stock
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {filteredMaterials.length === 0 && (
        <Text mt={6} textAlign='center'>
          No se encontraron materiales con los filtros aplicados.
        </Text>
      )}
    </Box>
  );
}
