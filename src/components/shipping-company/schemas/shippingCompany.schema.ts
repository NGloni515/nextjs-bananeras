import * as Yup from 'yup';


export interface ContactsProps {
    name: string;
    email: string;
    phone: string;
}

export interface HarborInfo {
    harborId: number | '';
    estDuration: string;
    cost: number | '';
}

export interface ValuesProps {
    name: string;
    code: string;
    countryId: number | '';
    frequencies: string;
    cargoType: string;
    trackingPlatform: string;
    departureHarbors: HarborInfo[];
    destinationHarbors: HarborInfo[];
    contacts: ContactsProps[];
    dataReviewed: boolean;
};

export const initialValues: ValuesProps = {
    name: '',
    code: '',
    countryId: '',
    frequencies: '',
    cargoType: '',
    trackingPlatform: '',
    departureHarbors: [{ harborId: '', estDuration: '', cost: '' }],
    destinationHarbors: [{ harborId: '', estDuration: '', cost: '' }],
    contacts: [{ name: '', email: '', phone: '' }],
    dataReviewed: false,
};

export const validationSchema = Yup.object({
    name: Yup.string()
        .max(50, 'Debe tener 50 caracteres o menos')
        .min(2, 'Debe tener 2 caracteres o más')
        .trim()
        .required('Requerido'),
    code: Yup.string()
        .max(50, 'Debe tener 50 caracteres o menos')
        .min(2, 'Debe tener 2 caracteres o más')
        .matches(/^[A-Z0-9]+$/, 'Solo debe contener mayúsculas y números')
        .trim()
        .required('Requerido'),
    countryId: Yup.number().required('Requerido'),
    frequencies: Yup.string()
        .max(50, 'Debe tener 50 caracteres o menos')
        .min(2, 'Debe tener 2 caracteres o más')
        .trim()
        .required('Requerido'),
    cargoType: Yup.string()
        .max(100, 'Debe tener 100 caracteres o menos')
        .min(2, 'Debe tener 2 caracteres o más')
        .trim()
        .required('Requerido'),
    trackingPlatform: Yup.string()
        .url('Debe incluir http:// o https:// (Ej: https://plataforma.com)')
        .trim(),
    departureHarbors: Yup.array()
        .of(
            Yup.object().shape({
                harborId: Yup.number().required('Requerido'),
                estDuration: Yup.string()
                    .max(50, 'Debe tener 50 caracteres o menos')
                    .min(2, 'Debe tener 2 caracteres o más')
                    .trim()
                    .required('Requerido'),
                cost: Yup.number()
                    .typeError('Debe ser un número con punto como separador decimal. Ej: 1.23')
                    .positive('Debe ser un número positivo')
                    .required('Requerido')
                    .test(
                        'no-comma',
                        'Utiliza punto como separador decimal. Ej: 1.23',
                        (_, context) => {
                            const originalValue = context.originalValue as string | number;
                            if (typeof originalValue === 'string' && originalValue.includes(',')) {
                                return false;
                            }
                            return true;
                        }
                    )
            })
        )
        .min(1, 'Debe ingresar al menos un puerto de salida')
        .required('Requerido'),
    destinationHarbors: Yup.array()
        .of(
            Yup.object().shape({
                harborId: Yup.number().required('Requerido'),
                estDuration: Yup.string()
                    .max(50, 'Debe tener 50 caracteres o menos')
                    .min(2, 'Debe tener 2 caracteres o más')
                    .trim()
                    .required('Requerido'),
                cost: Yup.number()
                    .typeError('Debe ser un número con punto como separador decimal. Ej: 1.23')
                    .positive('Debe ser un número positivo')
                    .required('Requerido')
                    .test(
                        'no-comma',
                        'Utiliza punto como separador decimal. Ej: 1.23',
                        (_, context) => {
                            const originalValue = context.originalValue as string | number;
                            if (typeof originalValue === 'string' && originalValue.includes(',')) {
                                return false;
                            }
                            return true;
                        }
                    )
            })
        )
        .min(1, 'Debe ingresar al menos un puerto de destino')
        .required('Requerido'),
    contacts: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string()
                    .max(100, 'Debe tener 100 caracteres o menos')
                    .min(2, 'Debe tener 2 caracteres o más')
                    .trim()
                    .required('Requerido'),
                email: Yup.string()
                    .email('Correo electrónico inválido')
                    .max(50, 'Debe tener 50 caracteres o menos')
                    .trim()
                    .required('Requerido'),
                phone: Yup.string()
                    .matches(
                        /^\+\d{7,15}$/,
                        'Debes incluir el codigo del País. Ejemplo: +593987654321 (Ecuador)'
                    )
                    .trim()
                    .required('Requerido'),
            })
        )
        .min(1, 'Debe ingresar al menos un contacto')
        .required('Requerido'),
    dataReviewed: Yup.boolean()
        .oneOf([true], 'Debes revisar los datos antes de enviar')
        .required('Requerido'),
});
