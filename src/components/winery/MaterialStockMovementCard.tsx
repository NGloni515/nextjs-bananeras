import {
  Box,
  Text,
  Heading,
  Divider,
  Badge,
  VStack,
  SimpleGrid,
  Select,
  Input,
  Flex,
  CloseButton,
} from '@chakra-ui/react';
import { format, getISOWeek, parseISO } from 'date-fns';
import { useMemo, useState } from 'react';
import {
  MATERIAL_TYPE_LABELS,
  MATERIAL_TYPE_ORDER,
} from '@/utils/materialTypeLabels';
import { ExporterBusinessMaterialStock } from '../../types/winery/exporterBusinessMaterialStock';
import WeekSelect from '../ui/form/WeekSelect';

interface Props {
  materials: ExporterBusinessMaterialStock[];
}

const MaterialStockMovementGrid = ({ materials }: Props): JSX.Element => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [selectedWeek, setSelectedWeek] = useState<number>(
    getISOWeek(new Date())
  );

  const materialTypes = useMemo(() => {
    const unique = new Set(
      materials.map((m) => m.exporterMaterialStock.materialType)
    );
    return Array.from(unique).sort();
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const typeMatch =
        filterType === 'ALL' ||
        m.exporterMaterialStock.materialType === filterType;
      const searchMatch = m.materialDetail.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [materials, filterType, search]);

  const filterByWeek = (dateStr: string): boolean => {
    const week = getISOWeek(parseISO(dateStr));
    return week === selectedWeek;
  };

  const MOVEMENT_TYPE_LABELS: Record<string, string> = {
    TRANSFER: 'TRANSFERENCIA',
    CONSUMPTION: 'CONSUMIDO',
  };

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing='4' mb={4}>
        <Flex flex='1' align='center'>
          <Select
            placeholder='Filtrar por Tipo'
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
            <Box ml={2} w='20px' />
          )}
        </Flex>

        <Flex flex='1' align='center'>
          <Input
            placeholder='Buscar por nombre'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <WeekSelect value={selectedWeek} onChange={setSelectedWeek} />
      </SimpleGrid>

      {filteredMaterials.length === 0 && (
        <Text>No hay materiales que coincidan con los filtros.</Text>
      )}

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {filteredMaterials.map((material) => {
          const filteredTransfers = material.stockMovementsFromExporter.filter(
            (m) => filterByWeek(m.createdAt)
          );
          const filteredConsumptions =
            material.stockMovementsConsumption.filter((m) =>
              filterByWeek(m.createdAt)
            );

          return (
            <Box key={material.id} p={4} borderWidth='1px' borderRadius='lg'>
              <Heading size='md'>{material.materialDetail.name}</Heading>
              <Text>Código: {material.materialDetail.code}</Text>
              <Text>Stock asignado: {material.assignedStock}</Text>
              <Text>Stock actual: {material.currentStock}</Text>
              <Divider my={3} />

              <Heading size='sm' mb={2}>
                Transferencias:
              </Heading>
              {filteredTransfers.length === 0 ? (
                <Text color='gray.500'>No hay transferencias esta semana.</Text>
              ) : (
                <VStack align='start' spacing={1}>
                  {filteredTransfers.map((movement) => (
                    <Box key={movement.id}>
                      <Badge colorScheme='green'>
                        {MOVEMENT_TYPE_LABELS[movement.type] ?? movement.type}
                      </Badge>{' '}
                      {movement.quantity} unidades - (
                      {format(new Date(movement.createdAt), 'dd/MM/yyyy')})
                    </Box>
                  ))}
                </VStack>
              )}

              <Divider my={3} />

              <Heading size='sm' mb={2}>
                Consumos:
              </Heading>
              {filteredConsumptions.length === 0 ? (
                <Text color='gray.500'>No hay consumos esta semana.</Text>
              ) : (
                <VStack align='start' spacing={1}>
                  {filteredConsumptions.map((movement) => (
                    <Box key={movement.id}>
                      <Badge colorScheme='red'>
                        {MOVEMENT_TYPE_LABELS[movement.type] ?? movement.type}
                      </Badge>{' '}
                      {movement.quantity} unidades - (Envío #
                      {movement.exportSentId}) -{' '}
                      {format(new Date(movement.createdAt), 'dd/MM/yyyy')}
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default MaterialStockMovementGrid;
