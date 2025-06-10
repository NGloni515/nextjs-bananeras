/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import InputFieldSentInsecticides from './ui/InputFieldSentInsecticides';
import InputFieldSentPesticides from './ui/InputFieldSentPesticides';
import InputFieldSentQuantity from './ui/InputFieldSentQuantity';
import { useCreateExportSent } from '../../hooks/export/export-sent/createExportSent';
import { ExportResponse } from '../../types/export.response';
import CheckboxForm from '../ui/form/CheckboxForm';

const pesticideSchema = Yup.object().shape({
  quantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 cajas')
    .required('Requerido'),
});

const insecticideSchema = Yup.object().shape({
  quantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .lessThan(10000, 'Debe ser menor que 10000 cajas')
    .required('Requerido'),
});

const buildValidationSchema = (boxBrand: any, boxQuantity: number): any => {
  const shape: Record<string, any> = {};

  const pushIfValid = (key: string, value: any): void => {
    if (value !== null && value > 0) {
      shape[key] = Yup.number()
        .integer('Debe ser un número entero')
        .min(1, 'Debe ser mayor que 0')
        .required('Requerido');
    }
  };

  pushIfValid('bottomTypeQuantity', boxQuantity);
  pushIfValid('lidTypeQuantity', boxQuantity);
  pushIfValid('coverTypeQuantity', boxQuantity);
  pushIfValid('cardboardTypeQuantity', boxQuantity);

  if (boxBrand) {
    pushIfValid('parasealTypeQuantity', boxBrand.parasealTypeQuantity);
    pushIfValid('padTypeQuantity', boxBrand.padTypeQuantity);
    pushIfValid('spongeTypeQuantity', boxBrand.spongeTypeQuantity);
    pushIfValid('labelQuantity', boxBrand.labelQuantity);
    pushIfValid('bandQuantity', boxBrand.bandQuantity);
    pushIfValid('sachetQuantity', boxBrand.sachetQuantity);
    pushIfValid('rubberQuantity', boxBrand.rubberQuantity);
    pushIfValid('protectorQuantity', boxBrand.protectorQuantity);
    pushIfValid('clusterBagQuantity', boxBrand.clusterBagQuantity);
    pushIfValid('palletsTypeQuantity', boxBrand.palletsTypeQuantity);
    pushIfValid('miniPalletsTypeQuantity', boxBrand.miniPalletsTypeQuantity);
    pushIfValid('cornerTypeQuantity', boxBrand.cornerTypeQuantity);
    pushIfValid(
      'reinforcementTypeQuantity',
      boxBrand.reinforcementTypeQuantity
    );
    pushIfValid('stapleQuantity', boxBrand.stapleQuantity);
    pushIfValid('strippingQuantity', boxBrand.strippingQuantity);
    pushIfValid('thermographQuantity', boxBrand.thermographQuantity);
    pushIfValid('sealQuantity', boxBrand.sealQuantity);
    pushIfValid('mettoLabelQuantity', boxBrand.mettoLabelQuantity);
    pushIfValid('packingTapeTypeQuantity', boxBrand.packingTapeTypeQuantity);
    pushIfValid('latexRemoverQuantity', boxBrand.latexRemoverQuantity);
    pushIfValid('blockingSheetQuantity', boxBrand.blockingSheetQuantity);
  }

  shape.pesticideSent = Yup.array()
    .of(pesticideSchema)
    .min(1, 'Debe de tener al menos un pesticida');
  shape.insecticideSent = Yup.array().of(insecticideSchema);
  shape.dataReviewed = Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required();

  return Yup.object().shape(shape);
};

const SentMaterialsExportForm = ({
  exportSelected,
}: {
  exportSelected: Partial<ExportResponse>;
  pathname: string;
}): React.JSX.Element => {
  const [initialValuesExport, setInitialValuesExport] = useState<any>({});
  const { createExportSent, isLoading } = useCreateExportSent();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (exportSelected?.boxBrand) {
      const brand = exportSelected.boxBrand;

      const buildValue = (key: string): string => (brand as any)?.[key] ?? '';

      setInitialValuesExport({
        exportId: exportSelected.id!,
        bottomTypeQuantity: exportSelected.boxQuantity!,
        lidTypeQuantity: exportSelected.boxQuantity!,
        coverTypeQuantity: exportSelected.boxQuantity!,
        cardboardTypeQuantity: exportSelected.boxQuantity!,
        parasealTypeQuantity: buildValue('parasealTypeQuantity'),
        padTypeQuantity: buildValue('padTypeQuantity'),
        spongeTypeQuantity: buildValue('spongeTypeQuantity'),
        labelQuantity: buildValue('labelQuantity'),
        bandQuantity: buildValue('bandQuantity'),
        sachetQuantity: buildValue('sachetQuantity'),
        rubberQuantity: buildValue('rubberQuantity'),
        protectorQuantity: buildValue('protectorQuantity'),
        clusterBagQuantity: buildValue('clusterBagQuantity'),
        palletsTypeQuantity: buildValue('palletsTypeQuantity'),
        miniPalletsTypeQuantity: buildValue('miniPalletsTypeQuantity'),
        cornerTypeQuantity: buildValue('cornerTypeQuantity'),
        reinforcementTypeQuantity: buildValue('reinforcementTypeQuantity'),
        stapleQuantity: buildValue('stapleQuantity'),
        strippingQuantity: buildValue('strippingQuantity'),
        thermographQuantity: buildValue('thermographQuantity'),
        sealQuantity: buildValue('sealQuantity'),
        mettoLabelQuantity: buildValue('mettoLabelQuantity'),
        packingTapeTypeQuantity: buildValue('packingTapeTypeQuantity'),
        latexRemoverQuantity: buildValue('latexRemoverQuantity'),
        blockingSheetQuantity: buildValue('blockingSheetQuantity'),
        pesticideSent:
          brand?.pesticideCocktail?.map((p: any) => ({
            pesticideId: p.pesticide?.id || '',
            quantity: p.quantity || '',
          })) || [],
        insecticideSent:
          brand?.insecticideCocktail?.map((i: any) => ({
            insecticideId: i.insecticide?.id || '',
            quantity: i.quantity || '',
          })) || [],
        dataReviewed: false,
      });
    }
  }, [exportSelected]);

  const sentMaterialsExport = async (
    values: any,
    actions: { resetForm: () => void }
  ): Promise<void> => {
    const { dataReviewed, ...sentMaterialsExportData } = values;
    dataReviewed;
    createExportSent(sentMaterialsExportData, {
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: error?.response?.data?.message || 'Error desconocido',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        if (error?.response?.status === 401) {
          router.push('/api/auth/signout');
        }
      },
      onSuccess: () => {
        toast({
          title: 'Registro de Insumos Enviado con Éxito',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        queryClient.invalidateQueries('exports');
        queryClient.invalidateQueries('exportsSent');
        queryClient.invalidateQueries('exportsSentPending');
        queryClient.invalidateQueries('exportsPending');
        queryClient.invalidateQueries('clientPaymentsPending');
        queryClient.invalidateQueries('cuttingSheets');
        queryClient.invalidateQueries('cuttingSheetsPending');
        queryClient.invalidateQueries('exportSentCostsPending');
        actions.resetForm();
        router.push('/dashboard/liquidation/exports-sent');
      },
    });
  };

  const renderMaterialField = (
    name: keyof typeof initialValuesExport,
    label: string,
    material: any,
    quantity: any,
    unit = 'C/U'
  ): JSX.Element | null => {
    if (!material || !quantity || Number(quantity) <= 0) return null;

    return (
      <InputFieldSentQuantity
        key={String(name)}
        name={String(name)}
        material={label}
        materialSelected={material.name || 'N/A'}
        quantity={Number(quantity)}
        unit={unit}
      />
    );
  };

  const brand = exportSelected?.boxBrand;
  const quantity = exportSelected?.boxQuantity || 0;

  return (
    <Formik
      initialValues={initialValuesExport}
      enableReinitialize
      validationSchema={buildValidationSchema(brand, quantity)}
      onSubmit={sentMaterialsExport}
    >
      <Form>
        <Flex flexDirection='column' gap={3}>
          <Heading fontSize='2xl' p='12px'>
            Exportación
          </Heading>
          <Divider mb='16px' />

          <Box p='4' border='1px' borderRadius='md' borderColor='gray.200'>
            <Text fontSize='sm'>
              <strong>Marca de Caja:</strong> {brand?.name || 'N/A'}
            </Text>
            <Text fontSize='sm'>
              <strong>Código de Marca:</strong> {brand?.brandCode || 'N/A'}
            </Text>
            <Text fontSize='sm'>
              <strong>Peso Neto (Caja):</strong> {brand?.netWeightBox} LBS
            </Text>
            <Text fontSize='sm'>
              <strong>Peso Bruto (Caja):</strong> {brand?.grossWeightBox} LBS
            </Text>
            <Text fontSize='sm'>
              <strong>Marca Principal:</strong> {brand?.brand?.name || 'N/A'}
            </Text>
          </Box>

          <Box mt='16px'>
            <FormLabel>Cantidad de cajas</FormLabel>
            <Input
              value={quantity}
              isReadOnly
              focusBorderColor='gray.200'
              _hover={{ borderColor: 'gray.200' }}
              cursor='not-allowed'
              textAlign='right'
              opacity={0.8}
            />
          </Box>

          <Heading fontSize='2xl' p='12px'>
            Materiales para las cajas
          </Heading>
          <Divider mb='16px' />

          {renderMaterialField(
            'bottomTypeQuantity',
            'Fondo',
            brand?.bottomType,
            quantity
          )}
          {renderMaterialField(
            'lidTypeQuantity',
            'Tapa',
            brand?.lidType,
            quantity
          )}
          {renderMaterialField(
            'coverTypeQuantity',
            'Funda',
            brand?.coverType,
            quantity
          )}
          {renderMaterialField(
            'cardboardTypeQuantity',
            'Cartulina',
            brand?.cardboardType,
            quantity
          )}
          {renderMaterialField(
            'parasealTypeQuantity',
            'ParaSeal',
            brand?.parasealType,
            brand?.parasealTypeQuantity
          )}
          {renderMaterialField(
            'padTypeQuantity',
            'Pad',
            brand?.padType,
            brand?.padTypeQuantity
          )}
          {renderMaterialField(
            'spongeTypeQuantity',
            'Esponja',
            brand?.spongeType,
            brand?.spongeTypeQuantity
          )}
          {renderMaterialField(
            'labelQuantity',
            'Etiqueta',
            brand?.label,
            brand?.labelQuantity
          )}
          {renderMaterialField(
            'bandQuantity',
            'Banda',
            brand?.band,
            brand?.bandQuantity
          )}
          {renderMaterialField(
            'sachetQuantity',
            'Sachet',
            brand?.sachet,
            brand?.sachetQuantity
          )}
          {renderMaterialField(
            'rubberQuantity',
            'Liga',
            brand?.rubber,
            brand?.rubberQuantity
          )}
          {renderMaterialField(
            'protectorQuantity',
            'Protector',
            brand?.protector,
            brand?.protectorQuantity
          )}
          {renderMaterialField(
            'clusterBagQuantity',
            'Cluster Bag',
            brand?.clusterBag,
            brand?.clusterBagQuantity
          )}
          {(brand?.palletsTypeQuantity ||
            brand?.miniPalletsTypeQuantity ||
            brand?.cornerTypeQuantity ||
            brand?.reinforcementTypeQuantity ||
            brand?.stapleQuantity ||
            brand?.strippingQuantity ||
            brand?.thermographQuantity ||
            brand?.sealQuantity ||
            brand?.mettoLabelQuantity) && (
            <>
              <Heading fontSize='2xl' p='12px'>
                Materiales para contenedor
              </Heading>
              <Divider mb='16px' />
            </>
          )}
          {renderMaterialField(
            'palletsTypeQuantity',
            'Pallet',
            brand?.palletsType,
            brand?.palletsTypeQuantity,
            'C/C'
          )}
          {renderMaterialField(
            'miniPalletsTypeQuantity',
            'Mini Pallet',
            brand?.miniPalletsType,
            brand?.miniPalletsTypeQuantity,
            'C/C'
          )}
          {renderMaterialField(
            'cornerTypeQuantity',
            'Esquinero',
            brand?.cornerType,
            brand?.cornerTypeQuantity,
            'C/C'
          )}
          {renderMaterialField(
            'reinforcementTypeQuantity',
            'Refuerzo',
            brand?.reinforcementType,
            brand?.reinforcementTypeQuantity,
            'C/C'
          )}
          {renderMaterialField(
            'stapleQuantity',
            'Grapa',
            brand?.staple,
            brand?.stapleQuantity,
            'C/C'
          )}
          {renderMaterialField(
            'strippingQuantity',
            'Zuncho',
            brand?.stripping,
            brand?.strippingQuantity,
            'C/C'
          )}
          {renderMaterialField(
            'thermographQuantity',
            'Termógrafo',
            brand?.thermograph,
            brand?.thermographQuantity,
            'C/C'
          )}
          {renderMaterialField(
            'sealQuantity',
            'Sello',
            brand?.seal,
            brand?.sealQuantity,
            'C/C'
          )}
          {renderMaterialField(
            'mettoLabelQuantity',
            'Etiqueta Metto',
            brand?.mettoLabel,
            brand?.mettoLabelQuantity,
            'C/C'
          )}
          {(brand?.packingTapeTypeQuantity ||
            brand?.latexRemoverQuantity ||
            brand?.blockingSheetQuantity) && (
            <>
              <Heading fontSize='2xl' p='12px'>
                Materiales adicionales
              </Heading>
              <Divider mb='16px' />
            </>
          )}
          {renderMaterialField(
            'packingTapeTypeQuantity',
            'Cinta de embalaje',
            brand?.packingTapeType,
            brand?.packingTapeTypeQuantity,
            'U/C'
          )}
          {renderMaterialField(
            'latexRemoverQuantity',
            'Removedor de Látex',
            brand?.latexRemover,
            brand?.latexRemoverQuantity,
            'U/C'
          )}
          {renderMaterialField(
            'blockingSheetQuantity',
            'Lámina de Bloque',
            brand?.blockingSheet,
            brand?.blockingSheetQuantity,
            'U/C'
          )}
          <Heading fontSize={'2xl'} p={'12px'}>
            Materiales para post cosecha
          </Heading>
          <Heading fontSize='xl' p='10px'>
            Pesticidas
          </Heading>
          <Divider mb='16px' />
          <InputFieldSentPesticides
            name='pesticideSent'
            pesticideCocktailSelected={brand?.pesticideCocktail || []}
          />

          {brand?.insecticideCocktail &&
            brand.insecticideCocktail.length > 0 && (
              <Box>
                <Heading fontSize='xl' p='10px'>
                  Insecticidas
                </Heading>
                <Divider mb='16px' />
                <InputFieldSentInsecticides
                  name='insecticideSent'
                  insecticideCocktailSelected={brand.insecticideCocktail}
                />
              </Box>
            )}

          <CheckboxForm
            name='dataReviewed'
            label='He revisado los datos agregados'
          />
          <Button
            mt='12px'
            type='submit'
            colorScheme='teal'
            isLoading={isLoading}
          >
            Enviar
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
};

export default SentMaterialsExportForm;
