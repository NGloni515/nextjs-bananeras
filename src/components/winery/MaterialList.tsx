'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  Center,
  Flex,
  CloseButton,
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
        Cargando Materiales <Spinner size='md' />
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

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} spacing={4}>
        {filteredMaterials.map((material) => (
          <Card
            key={`${material.materialType}-${material.id}`}
            border='1px solid #E2E8F0'
            borderRadius='md'
            p={2}
          >
            <CardBody>
              <Heading size='sm' mb={2}>
                {material.name}
              </Heading>
              <Text fontSize='sm' color='gray.600'>
                Tipo:{' '}
                {MATERIAL_TYPE_LABELS[material.materialType] ??
                  material.materialType}
              </Text>
              <Text fontSize='sm' color='gray.600'>
                Código: {material.code}
              </Text>
              <Button
                size='sm'
                mt={4}
                colorScheme='teal'
                onClick={() =>
                  router.push(
                    `/dashboard/winery/add-material/${material.materialType}-${material.id}`
                  )
                }
              >
                Agregar stock
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {filteredMaterials.length === 0 && (
        <Text mt={6} textAlign='center'>
          No se encontraron materiales con los filtros aplicados.
        </Text>
      )}
    </Box>
  );
}
