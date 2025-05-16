/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import DisplayField from './DisplayField';
import ReadOnlyDateGrid from './ReadOnlyDateGrid';
import { useCreateCuttingSheet } from '../../../hooks/export/cuttingSheet/createCuttingSheet';
import { CuttingSheetType } from '../../../types/cuttingSheet';
import { ExportResponse } from '../../../types/export.response';
import { ExportSentType } from '../../../types/exportSent';
import CheckboxForm from '../../ui/form/CheckboxForm';
import InputFieldSelector from '../../ui/form/InputFieldSelector';
import InputFieldText from '../../ui/form/InputFieldText';
import SelectCuttingType from '../cutting-type/SelectCuttingType';

const emptyExportData: ExportResponse = {
  id: 0,
  boxQuantity: 0,
  boxBrand: {
    id: 0,
    name: '',
    brandCode: '',
    netWeightBox: 0,
    grossWeightBox: 0,
    boxQuantity: 0,
    brand: { id: 0, name: '' },
    bottomType: { id: 0, name: '', code: '', exporterId: 0 },
    bottomTypeQuantity: 0,
    lidType: { id: 0, name: '', code: '', exporterId: 0 },
    lidTypeQuantity: 0,
    coverType: { id: 0, name: '', code: '', exporterId: 0 },
    coverTypeQuantity: 0,
    cardboardType: { id: 0, name: '', code: '', exporterId: 0 },
    cardboardTypeQuantity: 0,
    parasealType: { id: 0, name: '', code: '', exporterId: 0 },
    parasealTypeQuantity: 0,
    padType: { id: 0, name: '', code: '', exporterId: 0 },
    padTypeQuantity: 0,
    spongeType: { id: 0, name: '', code: '', exporterId: 0 },
    spongeTypeQuantity: 0,
    label: { id: 0, name: '' },
    labelQuantity: 0,
    band: { id: 0, name: '' },
    bandQuantity: 0,
    sachet: { id: 0, name: '' },
    sachetQuantity: 0,
    rubber: { id: 0, name: '' },
    rubberQuantity: 0,
    protector: { id: 0, name: '' },
    protectorQuantity: 0,
    clusterBag: { id: 0, name: '' },
    clusterBagQuantity: 0,
    pesticideCocktail: [],
    palletsType: { id: 0, name: '', code: '', exporterId: 0 },
    palletsTypeQuantity: 0,
    miniPalletsType: { id: 0, name: '', code: '', exporterId: 0 },
    miniPalletsTypeQuantity: 0,
    cornerType: { id: 0, name: '', code: '', exporterId: 0 },
    cornerTypeQuantity: 0,
    reinforcementType: { id: 0, name: '', code: '', exporterId: 0 },
    reinforcementTypeQuantity: 0,
    staple: { id: 0, name: '' },
    stapleQuantity: 0,
    stripping: { id: 0, name: '' },
    strippingQuantity: 0,
    thermograph: { id: 0, name: '' },
    thermographQuantity: 0,
    seal: { id: 0, name: '' },
    sealQuantity: 0,
    mettoLabel: { id: 0, name: '' },
    mettoLabelQuantity: 0,
    packingTapeType: { id: 0, name: '', code: '', exporterId: 0 },
    packingTapeTypeQuantity: 0,
    latexRemover: { id: 0, name: '' },
    latexRemoverQuantity: 0,
    insecticideCocktail: [],
    blockingSheet: { id: 0, name: '' },
    blockingSheetQuantity: 0,
  },
  merchant: {
    id: 0,
    businessName: '',
    businessId: '',
    city: { id: 0, name: '', code: '', provinceId: 0 },
    address: '',
  },
  business: {
    id: 0,
    name: '',
    address: '',
    area: 0,
    city: { id: 0, name: '', code: '', provinceId: 0 },
    latitude: null,
    longitude: null,
    contacts: [],
  },
  harborDeparture: {
    id: 0,
    name: '',
    country: { id: 0, name: '', code: '' },
    city: { id: 0, name: '', code: '', provinceId: 0 },
    latitude: null,
    longitude: null,
  },
  harborDestination: {
    id: 0,
    name: '',
    code: '',
    country: { id: 0, name: '', code: '', region: '' },
    city: { id: 0, name: '', code: '', provinceId: 0 },
    latitude: null,
    longitude: null,
  },
  client: {
    id: 0,
    businessName: '',
    businessId: '',
    commercialType: '',
    email: '',
    phone: '',
    certificates: {
      certificate: {
        id: 0,
        name: '',
        certificateCode: '',
      },
    },
  },
  exportSent: false,
  pendingExportSent: false,
  cuttingDate: '',
  weekDescription: '',
  weekDaysOfWeek: ['', '', '', '', '', '', ''],
  weekBoxesOfDay: [0, 0, 0, 0, 0, 0, 0],
  weekTotal: 0,
  shipName: '',
  estimatedTravelTime: '',
  bookingNumber: '',
  cutOffTime: '',
  numberOfVerifiers: 0,
  contractType: '',
  shippingCompany: { id: 0, name: '', code: '', contacts: [] },
  deposit: {
    id: 0,
    name: '',
    code: '',
    address: '',
    city: { id: 0, name: '' },
    contacts: [],
  },
  transport: {
    id: 0,
    name: '',
    ruc: '',
    address: '',
    satelliteTracking: false,
    contacts: [],
  },
  verifier: { id: 0, name: '', ruc: '', address: '', contacts: [] },
};

interface FinalFormValues {
  exportData: ExportResponse;
  cuttingTypeId: string;
  palletsHeight: string;
  containerPositioning: string;
  belowDeck: string;
  dataReviewed: boolean;
}

const initialFinalFormValues: FinalFormValues = {
  exportData: emptyExportData,
  cuttingTypeId: '',
  palletsHeight: '',
  containerPositioning: '',
  belowDeck: '',
  dataReviewed: false,
};

const mapExportToFormValues = (
  exportData: Partial<ExportResponse>
): FinalFormValues => {
  return {
    exportData: {
      ...emptyExportData,
      ...exportData,
      boxBrand: {
        ...emptyExportData.boxBrand,
        ...exportData.boxBrand,
        brand: {
          ...emptyExportData.boxBrand.brand,
          ...exportData.boxBrand?.brand,
        },
      },
      merchant: {
        ...emptyExportData.merchant,
        ...exportData.merchant,
        city: {
          ...emptyExportData.merchant.city,
          ...exportData.merchant?.city,
        },
      },
      business: {
        ...emptyExportData.business,
        ...exportData.business,
        city: {
          ...emptyExportData.business.city,
          ...exportData.business?.city,
        },
      },
      harborDeparture: {
        ...emptyExportData.harborDeparture,
        ...exportData.harborDeparture,
      },
      harborDestination: {
        ...emptyExportData.harborDestination,
        ...exportData.harborDestination,
      },
      shippingCompany: {
        ...emptyExportData.shippingCompany,
        ...exportData.shippingCompany,
      },
      deposit: {
        ...emptyExportData.deposit,
        ...exportData.deposit,
      },
      transport: {
        ...emptyExportData.transport,
        ...exportData.transport,
      },
      verifier: {
        ...emptyExportData.verifier,
        ...exportData.verifier,
      },
    },
    cuttingTypeId: '',
    palletsHeight: '',
    containerPositioning: '',
    belowDeck: '',
    dataReviewed: false,
  };
};

const finalValidationSchema = Yup.object({
  exportData: Yup.mixed().required('Datos de exportación requeridos'),
  cuttingTypeId: Yup.number()
    .typeError('El tipo de corte debe ser un número')
    .required('Tipo de corte es requerido'),
  palletsHeight: Yup.string().required('Altura de palets es requerida'),
  containerPositioning: Yup.string().required(
    'Posición del contenedor es requerida'
  ),
  belowDeck: Yup.string().required('Bajo cubierta es requerido'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
});

interface CuttingSheetFormProps {
  cuttingSheetSelected: Partial<ExportResponse>;
  exportSentSelected: Partial<ExportSentType>;
}

const CuttingSheetForm = ({
  cuttingSheetSelected,
  exportSentSelected,
}: CuttingSheetFormProps): React.JSX.Element => {
  const [finalValues, setFinalValues] = useState<FinalFormValues>(
    initialFinalFormValues
  );

  const { createCuttingSheet, isLoading } = useCreateCuttingSheet();
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (cuttingSheetSelected) {
      setFinalValues(mapExportToFormValues(cuttingSheetSelected));
    }
  }, [cuttingSheetSelected]);

  const handleSubmit = async (
    values: FinalFormValues,
    formikHelpers: FormikHelpers<FinalFormValues>
  ): Promise<void> => {
    const payload: CuttingSheetType = {
      exportSentId: exportSentSelected.id,
      cuttingTypeId: Number(values.cuttingTypeId),
      palletsHeight: values.palletsHeight,
      containerPositioning: values.containerPositioning,
      belowDeck: values.belowDeck,
    };

    createCuttingSheet(payload, {
      onError: (error: any) => {
        const { response } = error;
        const { data } = response;
        toast({
          title: `Error ${data.statusCode}: ${data.error}`,
          description: data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
      onSuccess: (response) => {
        toast({
          title: 'Registro y PDF creados exitosamente',
          description: 'Cierre esta ventana para abrir el PDF.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => window.open(response.pdfUrl, '_blank'),
        });
        queryClient.invalidateQueries('cuttingSheets');
        queryClient.invalidateQueries('cuttingSheetsPending');
        formikHelpers.resetForm();
        router.push('/dashboard/export/cutting-sheets');
      },
    });
  };
  const palletsOptions =
    finalValues.exportData.boxBrand?.palletsType?.name &&
    finalValues.exportData.boxBrand?.palletsTypeQuantity !== 0
      ? [
          { id: 'PALETS 8 DE ALTO', name: 'PALETS 8 DE ALTO' },
          { id: 'PALETS 9 DE ALTO', name: 'PALETS 9 DE ALTO' },
          { id: 'PALETS 10 DE ALTO', name: 'PALETS 10 DE ALTO' },
        ]
      : [{ id: 'N/A', name: 'N/A' }];

  return (
    <Box>
      <Heading mb='4' size='lg'>
        Información de la Exportación
      </Heading>
      <Box mb='6' p='4' borderWidth='1px' borderRadius='md'>
        <Heading size='md' mb='4'>
          Información General
        </Heading>
        <Divider mb={'16px'} />
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          <DisplayField
            label='Cantidad de Cajas'
            value={finalValues.exportData?.boxQuantity.toString()}
          />
          <DisplayField
            label='Envío de Insumos Pendiente'
            value={finalValues.exportData?.pendingExportSent ? 'Sí' : 'No'}
          />
          <DisplayField
            label='Fecha de Corte'
            value={new Date(
              finalValues.exportData.cuttingDate
            ).toLocaleDateString()}
          />
          <DisplayField
            label='Descripción de la Semana'
            value={finalValues.exportData.weekDescription}
          />
        </SimpleGrid>
        <ReadOnlyDateGrid
          weekDaysOfWeek={finalValues.exportData.weekDaysOfWeek}
          weekBoxesOfDay={finalValues.exportData.weekBoxesOfDay}
          weekTotal={finalValues.exportData.weekTotal}
        />

        <Heading size='md' mt='4' mb='4'>
          Información de Envío
        </Heading>
        <Divider mb={'16px'} />
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2' pb={4}>
          <DisplayField
            label='Nombre de la Nave'
            value={finalValues.exportData?.shipName}
          />
          <DisplayField
            label='Tiempo Estimado de Viaje'
            value={finalValues.exportData?.estimatedTravelTime}
          />
          <DisplayField
            label='Numero de Booking'
            value={finalValues.exportData?.bookingNumber}
          />
          <DisplayField
            label='Cut Off Time'
            value={finalValues.exportData?.cutOffTime}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2' pb={4}>
          <DisplayField
            label='Puerto de Salida'
            value={finalValues.exportData?.harborDeparture.name}
          />
          <DisplayField
            label='País'
            value={finalValues.exportData?.harborDeparture.country.name}
          />
          <DisplayField
            label='Ciudad'
            value={finalValues.exportData?.harborDeparture.city.name}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2' pb={4}>
          <DisplayField
            label='Puerto de Llegada'
            value={finalValues.exportData?.harborDestination.name}
          />
          <DisplayField
            label='País'
            value={finalValues.exportData?.harborDestination.country.name}
          />
          <DisplayField
            label='Ciudad'
            value={finalValues.exportData?.harborDestination.city.name}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2' pb={4}>
          <DisplayField
            label='Naviera'
            value={finalValues.exportData?.shippingCompany.name}
          />
          <DisplayField
            label='Código'
            value={finalValues.exportData?.shippingCompany.code}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2' pb={4}>
          <DisplayField
            label='Deposito'
            value={finalValues.exportData?.deposit.name}
          />
          <DisplayField
            label='Dirección'
            value={finalValues.exportData?.deposit.address}
          />
          <DisplayField
            label='Ciudad'
            value={finalValues.exportData?.deposit.city.name}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2' pb={4}>
          <DisplayField
            label='Transporte'
            value={finalValues.exportData?.transport.name}
          />
          <DisplayField
            label='RUC'
            value={finalValues.exportData?.transport.ruc}
          />
          <DisplayField
            label='Dirección'
            value={finalValues.exportData?.transport.address}
          />
          <DisplayField
            label='Tracking Satelital'
            value={
              finalValues.exportData?.transport.satelliteTracking ? 'Sí' : 'No'
            }
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2' pb={4}>
          <DisplayField
            label='Verificadora'
            value={finalValues.exportData?.verifier.name}
          />
          <DisplayField
            label='RUC'
            value={finalValues.exportData?.verifier.ruc}
          />
          <DisplayField
            label='Dirección'
            value={finalValues.exportData?.verifier.address}
          />
          <DisplayField
            label='Número de Verificadores'
            value={finalValues.exportData?.numberOfVerifiers.toString()}
          />
        </SimpleGrid>
        <Heading size='md' mt='4' mb='4'>
          Información del Cliente
        </Heading>
        <Divider mb={'16px'} />
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          <DisplayField
            label='Nombre'
            value={finalValues.exportData?.client.businessName}
          />
          <DisplayField
            label='RUC'
            value={finalValues.exportData?.client.businessId}
          />
          <DisplayField
            label='Tipo Comercial'
            value={finalValues.exportData?.client.commercialType}
          />
          <DisplayField
            label='Email'
            value={finalValues.exportData?.client.email}
          />
          <DisplayField
            label='Teléfono'
            value={finalValues.exportData?.client.phone}
          />
        </SimpleGrid>
        <Heading size='md' mt='4' mb='4'>
          Información del Productor
        </Heading>
        <Divider mb={'16px'} />
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          <DisplayField
            label='Nombre'
            value={finalValues.exportData?.merchant.businessName}
          />
          <DisplayField
            label='RUC'
            value={finalValues.exportData?.merchant.businessId}
          />
          <DisplayField
            label='Ciudad'
            value={finalValues.exportData?.merchant.city.name}
          />
          <DisplayField
            label='Dirección'
            value={finalValues.exportData?.merchant.address}
          />
        </SimpleGrid>
        <Heading size='md' mt='4' mb='4'>
          Información de la Finca
        </Heading>
        <Divider mb={'16px'} />
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          <DisplayField
            label='Nombre'
            value={finalValues.exportData?.business.name}
          />
          <DisplayField
            label='Área'
            value={finalValues.exportData?.business.area.toString()}
          />
          <DisplayField
            label='Ciudad'
            value={finalValues.exportData?.business.city.name}
          />
          <DisplayField
            label='Dirección'
            value={finalValues.exportData?.business.address}
          />
        </SimpleGrid>
        <Heading size='md' mt='4' mb='4'>
          Marca de Caja y Embalaje
        </Heading>
        <Divider mb={'16px'} />
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          <DisplayField
            label='Marca'
            value={finalValues.exportData?.boxBrand?.name || ''}
          />
          <DisplayField
            label='Marca de Caja'
            value={finalValues.exportData?.boxBrand?.brand?.name || ''}
          />
          <DisplayField
            label='Código de Marca'
            value={finalValues.exportData?.boxBrand?.brandCode || ''}
          />
          <DisplayField
            label='Tipo de Contrato'
            value={finalValues.exportData?.contractType || ''}
          />
          <DisplayField
            label='Peso Neto'
            value={
              finalValues.exportData?.boxBrand?.netWeightBox?.toString() ||
              'N/A'
            }
          />
          <DisplayField
            label='Peso Bruto'
            value={
              finalValues.exportData?.boxBrand?.grossWeightBox?.toString() ||
              'N/A'
            }
          />
        </SimpleGrid>

        <Heading size='sm' mt='4' mb='2'>
          Materiales de Caja
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          <DisplayField
            label='Fondo'
            value={finalValues.exportData?.boxBrand?.bottomType.name || ''}
          />
          <DisplayField
            label='Cant. Fondo'
            value={exportSentSelected?.bottomTypeQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Tapa'
            value={finalValues.exportData?.boxBrand?.lidType.name || ''}
          />
          <DisplayField
            label='Cant. Tapa'
            value={exportSentSelected?.lidTypeQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Funda'
            value={finalValues.exportData?.boxBrand?.coverType.name || ''}
          />
          <DisplayField
            label='Cant. Funda'
            value={exportSentSelected?.coverTypeQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Cartulina'
            value={finalValues.exportData?.boxBrand?.cardboardType.name || ''}
          />
          <DisplayField
            label='Cant. Cartulina'
            value={exportSentSelected?.cardboardTypeQuantity?.toString() || '0'}
          />
          <DisplayField
            label='ParaSeal'
            value={finalValues.exportData?.boxBrand?.parasealType.name || ''}
          />
          <DisplayField
            label='Cant. ParaSeal'
            value={exportSentSelected?.parasealTypeQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Pad'
            value={finalValues.exportData?.boxBrand?.padType.name || ''}
          />
          <DisplayField
            label='Cant. Pad'
            value={exportSentSelected?.padTypeQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Esponja'
            value={finalValues.exportData?.boxBrand?.spongeType.name || ''}
          />
          <DisplayField
            label='Cant. Esponja'
            value={exportSentSelected?.spongeTypeQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Etiqueta'
            value={finalValues.exportData?.boxBrand?.label.name || ''}
          />
          <DisplayField
            label='Cant. Etiqueta'
            value={exportSentSelected?.labelQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Banda'
            value={finalValues.exportData?.boxBrand?.band.name || ''}
          />
          <DisplayField
            label='Cant. Banda'
            value={exportSentSelected?.bandQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Sachet'
            value={finalValues.exportData?.boxBrand?.sachet.name || ''}
          />
          <DisplayField
            label='Cant. Sachet'
            value={exportSentSelected?.sachetQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Liga'
            value={finalValues.exportData?.boxBrand?.rubber.name || ''}
          />
          <DisplayField
            label='Cant. Liga'
            value={exportSentSelected?.rubberQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Protector'
            value={finalValues.exportData?.boxBrand?.protector.name || ''}
          />
          <DisplayField
            label='Cant. Protector'
            value={exportSentSelected?.protectorQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Cluster Bag'
            value={finalValues.exportData?.boxBrand?.clusterBag.name || ''}
          />
          <DisplayField
            label='Cant. Cluster Bag'
            value={exportSentSelected?.clusterBagQuantity?.toString() || '0'}
          />
        </SimpleGrid>
        <Heading size='sm' mt='4' mb='2'>
          Materiales por Contenedor
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          <DisplayField
            label='Pallets'
            value={finalValues.exportData?.boxBrand?.palletsType.name || ''}
          />
          <DisplayField
            label='Cant. Pallets'
            value={exportSentSelected?.palletsTypeQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Mini Pallets'
            value={finalValues.exportData?.boxBrand?.miniPalletsType.name || ''}
          />
          <DisplayField
            label='Cant. Mini Pallets'
            value={
              exportSentSelected?.miniPalletsTypeQuantity?.toString() || '0'
            }
          />
          <DisplayField
            label='Esquinero'
            value={finalValues.exportData?.boxBrand?.cornerType.name || ''}
          />
          <DisplayField
            label='Cant. Esquinero'
            value={exportSentSelected?.cornerTypeQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Refuerzo'
            value={
              finalValues.exportData?.boxBrand?.reinforcementType.name || ''
            }
          />
          <DisplayField
            label='Cant. Refuerzo'
            value={
              exportSentSelected?.reinforcementTypeQuantity?.toString() || '0'
            }
          />
          <DisplayField
            label='Grapa'
            value={finalValues.exportData?.boxBrand?.staple.name || ''}
          />
          <DisplayField
            label='Cant. Grapa'
            value={exportSentSelected?.stapleQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Zuncho'
            value={finalValues.exportData?.boxBrand?.stripping.name || ''}
          />
          <DisplayField
            label='Cant. Zuncho'
            value={exportSentSelected?.strippingQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Termógrafo'
            value={finalValues.exportData?.boxBrand?.thermograph.name || ''}
          />
          <DisplayField
            label='Cant. Termógrafo'
            value={exportSentSelected?.thermographQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Sello'
            value={finalValues.exportData?.boxBrand?.seal.name || ''}
          />
          <DisplayField
            label='Cant. Sello'
            value={exportSentSelected?.sealQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Etiqueta Metto'
            value={finalValues.exportData?.boxBrand?.mettoLabel.name || ''}
          />
          <DisplayField
            label='Cant. Etiqueta Metto'
            value={exportSentSelected?.mettoLabelQuantity?.toString() || '0'}
          />
        </SimpleGrid>

        <Heading size='sm' mt='4' mb='2'>
          Adicionales
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          <DisplayField
            label='Cinta'
            value={finalValues.exportData?.boxBrand?.packingTapeType.name || ''}
          />
          <DisplayField
            label='Cant. Cinta'
            value={
              exportSentSelected?.packingTapeTypeQuantity?.toString() || '0'
            }
          />
          <DisplayField
            label='Removedor'
            value={finalValues.exportData?.boxBrand?.latexRemover.name || ''}
          />
          <DisplayField
            label='Cant. Removedor'
            value={exportSentSelected?.latexRemoverQuantity?.toString() || '0'}
          />
          <DisplayField
            label='Lámina'
            value={finalValues.exportData?.boxBrand?.blockingSheet.name || ''}
          />
          <DisplayField
            label='Cant. Lámina'
            value={exportSentSelected?.blockingSheetQuantity?.toString() || '0'}
          />
        </SimpleGrid>
        <Heading size='sm' mt='4' mb='2'>
          Insumos Post Cosecha{' '}
        </Heading>
        <Heading size='sm' mt='4' mb='2'>
          Pesticide Cocktail
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          {exportSentSelected?.pesticideSent?.map((item, index) => (
            <DisplayField
              key={index}
              label={`Pesticida ${index + 1}`}
              value={`${item?.pesticide?.name} (Cant: ${item.quantity})`}
            />
          ))}
        </SimpleGrid>
        <Heading size='sm' mt='4' mb='2'>
          Insecticide Cocktail
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing='2'>
          {exportSentSelected?.insecticideSent?.map((item, index) => (
            <DisplayField
              key={index}
              label={`Insecticida ${index + 1}`}
              value={`${item?.insecticide?.name} (Cant: ${item.quantity})`}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Formik
        initialValues={finalValues}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={finalValidationSchema}
      >
        {({ values }) => (
          <Form>
            <Flex direction='column' gap='4'>
              <Heading size='md'>Datos para la Hoja de Corte</Heading>
              <Divider mb={'16px'} />
              <SelectCuttingType name='cuttingTypeId' />
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing='4'>
                <InputFieldSelector
                  name={'palletsHeight'}
                  label={'Altura de Palets '}
                  alignItems='flex-end'
                  options={palletsOptions}
                />
                <InputFieldSelector
                  name={'containerPositioning'}
                  label={'Posicion del Contenedor '}
                  alignItems='flex-end'
                  options={[
                    { id: 'N/A', name: 'N/A' },
                    { id: 'CAMPO', name: 'CAMPO' },
                    { id: 'ACOPIO', name: 'ACOPIO' },
                  ]}
                />
                <InputFieldText
                  name={'belowDeck'}
                  label={'Bajo Cubierta '}
                  isReadOnly
                  defaultValue={
                    values.containerPositioning === 'CAMPO'
                      ? 'NO'
                      : values.containerPositioning === 'ACOPIO'
                        ? 'SI'
                        : 'N/A'
                  }
                  placeholder='Bajo cubierta'
                  alignItems='flex-end'
                />
              </SimpleGrid>
              <CheckboxForm
                name='dataReviewed'
                label='He revisado los datos agregados'
              />
              <Button type='submit' colorScheme='teal' isLoading={isLoading}>
                Enviar
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CuttingSheetForm;
