'use client';

import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  VStack,
  Divider,
  Badge,
  GridItem,
  useToast,
  SimpleGrid,
  Select,
  Flex,
} from '@chakra-ui/react';
import { parseISO, getISOWeek } from 'date-fns';
import { FieldArray, Form, Formik } from 'formik';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useAdjustWeekly } from '../../hooks/winery/useAdjustWeekly';
import { useStockMovementsByBusiness } from '../../hooks/winery/useStockMovementsByBusiness';
import CheckboxForm from '../ui/form/CheckboxForm';
import InputFieldNumber from '../ui/form/InputFieldNumber';

interface AdjustWeeklyFormProps {
  businessId: number;
  week: number;
}

const MOVEMENT_TYPE_LABELS: Record<string, string> = {
  TRANSFER: 'TRANSFERENCIA',
  CONSUMPTION: 'CONSUMIDO',
};

const getValidationSchema = (): Yup.ObjectSchema<{
  dataReviewed: boolean;
  stocks: { id: number; real: number; current: number }[];
  selectedCosts: Record<string, number>;
}> => {
  return Yup.object({
    dataReviewed: Yup.boolean()
      .oneOf([true], 'Debes revisar los datos antes de enviar')
      .required('Requerido'),
    stocks: Yup.array()
      .of(
        Yup.object({
          id: Yup.number().required(),
          real: Yup.number()
            .required('Requerido')
            .min(0, 'No puede ser negativo')
            .test('max-current', function (value) {
              const { current } = this.parent;
              if (value > current) {
                return this.createError({
                  message: `No puede ser mayor a ${current}`,
                });
              }
              return true;
            })
            .typeError('Debe ser un número'),
          current: Yup.number().required(),
        })
      )
      .required()
      .default([]),
    selectedCosts: Yup.object().default({}),
  });
};

const AdjustWeeklyForm = ({
  businessId,
  week,
}: AdjustWeeklyFormProps): JSX.Element => {
  const { data: materials = [], isLoading } =
    useStockMovementsByBusiness(businessId);
  const toast = useToast();
  const mutation = useAdjustWeekly(businessId);
  const queryClient = useQueryClient();

  const initialValues = {
    dataReviewed: false,
    stocks: materials.map((item) => ({
      id: item.exporterMaterialStockId,
      name: item.materialDetail.name,
      code: item.materialDetail.code,
      assigned: item.assignedStock,
      current: item.currentStock,
      real: item.currentStock,
      currentCost: item.currentCost,
      transfers: item.stockMovementsFromExporter.filter(
        (m) => getISOWeek(parseISO(m.createdAt)) === week
      ),
      consumptions: item.stockMovementsConsumption.filter(
        (m) => getISOWeek(parseISO(m.createdAt)) === week
      ),
    })),
    selectedCosts: {} as Record<string, number>,
  };

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    const updates = values.stocks.filter((item) => item.real !== item.current);
    if (updates.length === 0) {
      toast({ title: 'No hay cambios para ajustar.', status: 'info' });
      return;
    }
    const realStocks = Object.fromEntries(
      updates.map((item) => [item.id, item.real])
    );
    try {
      await mutation.mutateAsync({ realStocks });
      toast({
        title: 'Stock ajustado correctamente.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries('stockMovements');
    } catch {
      toast({
        title: 'Error al ajustar el stock.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading size='lg' mb={8}>
        Materiales - Semana {week}
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, isSubmitting, setFieldValue }) => {
          const totalDiscount = values.stocks.reduce((acc, item) => {
            const diff = item.current - item.real;
            const cost =
              values.selectedCosts[String(item.id)] ?? item.currentCost ?? 0;
            return acc + (diff > 0 ? diff * cost : 0);
          }, 0);

          return (
            <Form>
              <FieldArray name='stocks'>
                {() => (
                  <VStack spacing={4} align='stretch'>
                    {values.stocks.length === 0 && (
                      <Text>No hay materiales disponibles.</Text>
                    )}
                    {values.stocks.map((item, index) => {
                      const uniqueCosts = new Set<number>();
                      uniqueCosts.add(item.currentCost ?? 0);
                      item.consumptions.forEach((c) => {
                        c.exportSent?.materialCosts?.forEach((mc) => {
                          if (mc.unitCost !== undefined)
                            uniqueCosts.add(mc.unitCost);
                        });
                      });
                      const costs = Array.from(uniqueCosts);

                      const selectedCost =
                        values.selectedCosts[String(item.id)] ??
                        item.currentCost ??
                        0;
                      const diff = item.current - item.real;
                      const materialDiscount =
                        diff > 0 ? diff * selectedCost : 0;

                      return (
                        <Box
                          key={item.id}
                          p={2}
                          borderWidth='1px'
                          borderRadius='md'
                        >
                          <Grid templateColumns='1fr 1fr 1fr' gap={4} mb={2}>
                            <Text fontWeight='bold'>{item.name}</Text>
                            <Text>
                              <strong>Código:</strong> {item.code}
                            </Text>
                            <Text>
                              <strong>Asignado:</strong> {item.assigned}
                            </Text>
                          </Grid>

                          <Grid templateColumns='1fr 1fr' gap={4} mb={2}>
                            <Text>
                              <strong>Stock Actual:</strong> {item.current}
                            </Text>
                            <Flex direction='column' gap={1}>
                              <Text>
                                <strong>Stock Ajustado:</strong>
                              </Text>
                              <InputFieldNumber
                                name={`stocks[${index}].real`}
                                value={item.real}
                                placeholder='Cantidad Real'
                                isDecimal={false}
                              />
                            </Flex>
                          </Grid>

                          <SimpleGrid
                            columns={{ base: 1, md: 2 }}
                            spacing='4'
                            mb={4}
                          >
                            <Text>
                              <strong>
                                Seleccionar Costo para el Descuento:
                              </strong>
                            </Text>
                            <Select
                              value={
                                values.selectedCosts[String(item.id)] ??
                                item.currentCost
                              }
                              onChange={(e) =>
                                setFieldValue(
                                  `selectedCosts.${item.id}`,
                                  parseFloat(e.target.value)
                                )
                              }
                              mt={1}
                            >
                              {costs.map((cost) => (
                                <option key={cost} value={cost}>
                                  ${cost.toFixed(2)}
                                </option>
                              ))}
                            </Select>
                            <Box></Box>
                            <Text
                              mt={1}
                              color={
                                materialDiscount === 0 ? 'black' : 'red.600'
                              }
                            >
                              <strong>Descuento estimado:</strong> $
                              {materialDiscount.toFixed(2)}
                            </Text>
                          </SimpleGrid>

                          <Divider my={2} />
                          <Grid templateColumns='1fr 1fr' gap={4}>
                            <GridItem>
                              <Heading size='sm' mb={2}>
                                Transferencias (Semana {week})
                              </Heading>
                              {item.transfers.length === 0 ? (
                                <Text color='gray.500'>
                                  No hay transferencias.
                                </Text>
                              ) : (
                                <VStack align='start' spacing={1}>
                                  {item.transfers.map((m) => (
                                    <Box key={m.id}>
                                      <Badge colorScheme='green'>
                                        {MOVEMENT_TYPE_LABELS[m.type] ?? m.type}
                                      </Badge>{' '}
                                      {m.quantity} unidades - (
                                      {new Date(
                                        m.createdAt
                                      ).toLocaleDateString()}
                                      )
                                    </Box>
                                  ))}
                                </VStack>
                              )}
                            </GridItem>
                            <GridItem>
                              <Heading size='sm' mb={2}>
                                Consumos (Semana {week})
                              </Heading>
                              {item.consumptions.length === 0 ? (
                                <Text color='gray.500'>No hay consumos.</Text>
                              ) : (
                                <VStack align='start' spacing={1}>
                                  {item.consumptions.map((m) => (
                                    <Box key={m.id}>
                                      <Badge colorScheme='red'>
                                        {!m.exportSentId
                                          ? 'DESCONTADO'
                                          : (MOVEMENT_TYPE_LABELS[m.type] ??
                                            m.type)}
                                      </Badge>{' '}
                                      {m.quantity} unidades{' '}
                                      {!m.exportSentId
                                        ? null
                                        : `- (Envío #${m.exportSentId})`}{' '}
                                      -{' '}
                                      {new Date(
                                        m.createdAt
                                      ).toLocaleDateString()}
                                    </Box>
                                  ))}
                                </VStack>
                              )}
                            </GridItem>
                          </Grid>
                        </Box>
                      );
                    })}

                    {values.stocks.length > 0 && (
                      <>
                        <Text
                          fontWeight='bold'
                          color={totalDiscount === 0 ? 'black' : 'red.500'}
                        >
                          Total descuento estimado: ${totalDiscount.toFixed(2)}
                        </Text>

                        <SimpleGrid columns={1} spacing={2}>
                          <CheckboxForm
                            name='dataReviewed'
                            label='He revisado los datos antes de enviar'
                          />
                          <Button
                            type='submit'
                            colorScheme='teal'
                            isLoading={
                              mutation.isLoading || isLoading || isSubmitting
                            }
                          >
                            Enviar Ajuste
                          </Button>
                        </SimpleGrid>
                      </>
                    )}
                  </VStack>
                )}
              </FieldArray>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AdjustWeeklyForm;
