import * as Yup from 'yup';

export interface ContactsProps {
    name: string;
    role: string;
    email: string;
    phone: string;
}

export interface BusinessCodesProps {
    code: string;
}

export interface BusinessesProps {
    name: string;
    countryId: number | '';
    provinceId: number | '';
    cityId: string;
    address: string;
    fruitType: string;
    area: number;
    latitude: number | 0;
    longitude: number | 0;
    codeMAGAP: string;
    codeAGROCALIDAD: string;
    certificates: number[];
    businessCodes: BusinessCodesProps[];
    contacts: ContactsProps[];
}

export interface ValuesProps {
    businessName: string;
    businessId: string;
    countryId: number | '';
    provinceId: number | '';
    cityId: string;
    address: string;
    email: string;
    contractType: '' | 'FOB' | 'FAS' | 'SPOT';
    businesses: BusinessesProps[];
}

export const initialValues: ValuesProps = {
    businessName: '',
    businessId: '',
    address: '',
    countryId: 1,
    provinceId: '',
    cityId: '',
    email: '',
    contractType: '',
    businesses: [
        {
            name: '',
            countryId: 1,
            provinceId: '',
            cityId: '',
            address: '',
            fruitType: '',
            area: 0,
            latitude: 0,
            longitude: 0,
            codeMAGAP: '',
            codeAGROCALIDAD: '',
            certificates: [],
            businessCodes: [{ code: '' }],
            contacts: [{ name: '', role: '', email: '', phone: '' }],
        },
    ],
};

const contactSchema = Yup.object().shape({
    name: Yup.string()
        .max(100)
        .min(2)
        .matches(/^[a-zA-Z\s]+$/, 'Solo debe contener letras y espacios')
        .transform((value) => value.trim())
        .required('Requerido'),
    role: Yup.string().max(100).min(2).transform((v) => v.trim()).required('Requerido'),
    email: Yup.string().email().max(50).transform((v) => v.trim()),
    phone: Yup.string()
        .matches(/^(\+593|0)9\d{8}$/, 'Debe comenzar con +593 o 09')
        .transform((v) => v.trim())
        .required('Requerido'),
});

const businessCodeSchema = Yup.object().shape({
    code: Yup.string()
        .min(5)
        .max(50)
        .matches(/^[a-zA-Z0-9]+$/, 'Solo letras y números')
        .transform((v) => v.trim())
        .required('Requerido'),
});

const businessSchema = Yup.object().shape({
    name: Yup.string()
        .max(100)
        .min(2)
        .matches(/^[a-zA-Z0-9\s]+$/)
        .transform((v) => v.trim())
        .required('Requerido'),
    address: Yup.string()
        .max(100)
        .matches(/^[a-zA-Z0-9\s.,'-]+$/)
        .transform((v) => v.trim()),
    fruitType: Yup.string()
        .oneOf(['Orgánica', 'Convencional'])
        .required('Requerido'),
    area: Yup.number().moreThan(0).required('Requerido'),
    latitude: Yup.number().min(-90).max(90).notRequired(),
    longitude: Yup.number().min(-180).max(180).notRequired(),
    codeMAGAP: Yup.string()
        .min(5)
        .max(50)
        .matches(/^[a-zA-Z0-9]+$/)
        .transform((v) => v.trim())
        .required('Requerido'),
    codeAGROCALIDAD: Yup.string()
        .min(5)
        .max(50)
        .matches(/^[a-zA-Z0-9]+$/)
        .transform((v) => v.trim())
        .required('Requerido'),
    businessCodes: Yup.array().of(businessCodeSchema).min(1),
    contacts: Yup.array().of(contactSchema).min(1),
});

export const validationSchema = Yup.object({
    businessName: Yup.string()
        .max(100)
        .min(2)
        .matches(/^[a-zA-Z0-9\s]+$/)
        .transform((v) => v.trim())
        .required('Requerido'),
    businessId: Yup.string()
        .length(13)
        .matches(/^\d{10}\d{3}$/)
        .transform((v) => v.trim())
        .required('Requerido'),
    address: Yup.string()
        .max(100)
        .matches(/^[a-zA-Z0-9\s.,'-]+$/)
        .transform((v) => v.trim()),
    email: Yup.string().email().max(50).transform((v) => v.trim()),
    contractType: Yup.string()
        .oneOf(['FOB', 'FAS', 'SPOT'])
        .required('Requerido'),
    businesses: Yup.array().of(businessSchema).min(1),
});
