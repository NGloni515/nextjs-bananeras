import * as Yup from 'yup';
interface WeekCuttingProps {
  description: string;
  daysOfWeek: string[];
  boxesOfDay: number[];
  total: number;
}

export interface ValuesProps {
  boxQuantity: number;
  boxBrandId: number;
  merchantId: number;
  businessId: number;
  clientId: number;
  weekCutting: WeekCuttingProps;
  cuttingDate: Date | '';
  shipName: string;
  estimatedTravelTime: string;
  bookingNumber: string;
  cutOffTime: string;
  contractType: string;
  numberOfVerifiers: number;
  shippingCompanyId: number;
  departureHarborId: number;
  destinationHarborId: number;
  depositId: number;
  transportId: number;
  verifierId: number;
  dataReviewed: boolean;
}

export const initialValues: ValuesProps = {
  boxQuantity: 0,
  boxBrandId: 0,
  merchantId: 0,
  businessId: 0,
  clientId: 0,
  cuttingDate: '',
  weekCutting: {
    description: '',
    daysOfWeek: ['', '', '', '', '', '', ''],
    boxesOfDay: [0, 0, 0, 0, 0, 0, 0],
    total: 0,
  },
  shipName: '',
  estimatedTravelTime: '',
  bookingNumber: '',
  cutOffTime: '',
  contractType: '',
  numberOfVerifiers: 0,
  shippingCompanyId: 0,
  departureHarborId: 0,
  destinationHarborId: 0,
  depositId: 0,
  transportId: 0,
  verifierId: 0,
  dataReviewed: false,
};

const weekCuttingSchema = Yup.object().shape({
  description: Yup.string().required('La descripción es requerida'),
  daysOfWeek: Yup.array()
    .of(Yup.string().required('La fecha es requerida'))
    .length(7, 'Debe contener exactamente 7 elementos')
    .required('Los días de la semana son requeridos'),
  boxesOfDay: Yup.array()
    .of(Yup.number().required('La cantidad de cajas es requerida'))
    .length(7, 'Debe contener exactamente 7 elementos')
    .required('La cantidad de cajas por día es requerida'),
});

export const validationSchema = Yup.object({
  boxQuantity: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  boxBrandId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  merchantId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  businessId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  clientId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  cuttingDate: Yup.date().required('Requerido'),
  weekCutting: weekCuttingSchema.test(
    'boxesOfDay-sum',
    'La sumatoria de cajas por día debe ser igual al total de cajas',
    function (value) {
      if (!value) return false;
      const { boxesOfDay } = value;
      const boxQuantity = this.parent.boxQuantity;
      const totalBoxes = boxesOfDay.reduce((acc, curr) => acc + curr, 0);
      return totalBoxes === boxQuantity;
    }
  ),
  shipName: Yup.string()
    .max(100, 'Debe tener 100 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .trim()
    .required('Requerido'),
  estimatedTravelTime: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .trim()
    .required('Requerido'),
  bookingNumber: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .trim()
    .required('Requerido'),
  cutOffTime: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Debe tener el formato HH:mm')
    .required('Requerido'),
  contractType: Yup.string()
    .max(50, 'Debe tener 50 caracteres o menos')
    .min(2, 'Debe tener 2 caracteres o más')
    .trim()
    .required('Requerido'),
  numberOfVerifiers: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  shippingCompanyId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  departureHarborId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  destinationHarborId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  depositId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  transportId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  verifierId: Yup.number()
    .integer('Debe ser un número entero')
    .moreThan(0, 'Debe ser mayor que 0')
    .required('Requerido'),
  dataReviewed: Yup.boolean()
    .oneOf([true], 'Debes revisar los datos antes de enviar')
    .required('Requerido'),
});
