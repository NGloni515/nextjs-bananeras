export interface BreadcrumbItem {
  name: string;
  href: string;
  isCurrent: boolean;
}

type ViewMap = Record<string, string>;
type AddMap = Record<
  string,
  {
    parent: string;
    addLabel?: string;
    parentHref?: string;
  }
>;

const VIEW_ROUTES: ViewMap = {
  '/dashboard/producer/producers': 'Productores',
  '/dashboard/producer/fincas': 'Fincas',

  '/dashboard/client/clients': 'Clientes',
  '/dashboard/client/harbors': 'Puertos',
  '/dashboard/client/shipping-companies': 'Navieras',
  '/dashboard/client/deposits': 'Depósitos',
  '/dashboard/client/transports': 'Transportes',

  '/dashboard/box-brands/search': 'Alícuotas',
  '/dashboard/box-brands/verifiers': 'Verificadoras',
  '/dashboard/box-brands/cutting-types': 'Tipos de Corte',
  '/dashboard/box-brands/upload-logo': 'Agregar Logo',

  '/dashboard/winery/stock': 'Stock',
  '/dashboard/winery/stock-movements': 'Trazabilidad de Stock',
  '/dashboard/winery/adjust-weekly': 'Ajuste Semanal',

  '/dashboard/export/search': 'Exportaciones',
  '/dashboard/liquidation/exports-sent': 'Envíos de Insumos',

  '/dashboard/export/cutting-sheets': 'Hojas de Corte',

  '/dashboard/liquidation/export-costs': 'Costos Validados',
  '/dashboard/liquidation/producer-payments': 'Pago Productores',
  '/dashboard/liquidation/client-payments': 'Cobro Clientes',
  '/dashboard/client/bank-accounts': 'Cuentas Bancarias',

  '/dashboard/settings/upload-logo': 'Logo Exportadora',
  '/dashboard/producer/upload-logo': 'Logo Productores',
};

const ADD_ROUTES: AddMap = {
  '/dashboard/producer/add-producer': {
    parent: 'Productores',
    addLabel: 'Agregar Productor',
    parentHref: '/dashboard/producer/producers',
  },
  '/dashboard/producer/add-fincas': {
    parent: 'Fincas',
    addLabel: 'Agregar Finca',
    parentHref: '/dashboard/producer/fincas',
  },
  '/dashboard/producer/add-bank-account': {
    parent: 'Cuentas Bancarias',
    addLabel: 'Agregar Cuenta Bancaria',
    parentHref: '/dashboard/client/bank-accounts',
  },

  '/dashboard/client/add-client': {
    parent: 'Clientes',
    addLabel: 'Agregar Cliente',
    parentHref: '/dashboard/client/clients',
  },
  '/dashboard/client/add-harbor': {
    parent: 'Puertos',
    addLabel: 'Agregar Puerto',
    parentHref: '/dashboard/client/harbors',
  },
  '/dashboard/client/add-shipping-company': {
    parent: 'Navieras',
    addLabel: 'Agregar Naviera',
    parentHref: '/dashboard/client/shipping-companies',
  },
  '/dashboard/client/add-deposit': {
    parent: 'Depósitos',
    addLabel: 'Agregar Depósito',
    parentHref: '/dashboard/client/deposits',
  },
  '/dashboard/client/add-transport': {
    parent: 'Transportes',
    addLabel: 'Agregar Transporte',
    parentHref: '/dashboard/client/transports',
  },
  '/dashboard/client/add-bank-account': {
    parent: 'Cuentas Bancarias',
    addLabel: 'Agregar Cuenta Bancaria',
    parentHref: '/dashboard/client/bank-accounts',
  },

  '/dashboard/box-brands/add-box-brand': {
    parent: 'Alícuotas',
    addLabel: 'Agregar Alícuotas',
    parentHref: '/dashboard/box-brands/search',
  },
  '/dashboard/box-brands/add-verifier': {
    parent: 'Verificadoras',
    addLabel: 'Agregar Verificadora',
    parentHref: '/dashboard/box-brands/verifiers',
  },
  '/dashboard/box-brands/add-cutting-type': {
    parent: 'Tipos de Corte',
    addLabel: 'Agregar Tipo de Corte',
    parentHref: '/dashboard/box-brands/cutting-types',
  },

  '/dashboard/export/add-export': {
    parent: 'Exportaciones',
    addLabel: 'Agregar Exportación',
    parentHref: '/dashboard/export/search',
  },
  '/dashboard/liquidation/add-supply-shipment': {
    parent: 'Envíos de Insumos',
    addLabel: 'Agregar Envío de Insumos',
    parentHref: '/dashboard/liquidation/exports-sent',
  },

  '/dashboard/export/add-cutting-sheet': {
    parent: 'Hojas de Corte',
    addLabel: 'Agregar Hoja de Corte',
    parentHref: '/dashboard/export/cutting-sheets',
  },

  '/dashboard/winery/add-material': {
    parent: 'Stock',
    addLabel: 'Agregar Stock',
    parentHref: '/dashboard/winery/stock',
  },

  '/dashboard/liquidation/add-export-cost': {
    parent: 'Costos Validados',
    addLabel: 'Agregar Costos Validados',
    parentHref: '/dashboard/liquidation/export-costs',
  },
  '/dashboard/liquidation/producer-pending-payments': {
    parent: 'Pago Productores',
    addLabel: 'Agregar Pago Productores',
    parentHref: '/dashboard/liquidation/producer-payments',
  },
  '/dashboard/liquidation/client-pending-payments': {
    parent: 'Cobro Clientes',
    addLabel: 'Agregar Cobro Clientes',
    parentHref: '/dashboard/liquidation/client-payments',
  },
};

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const cleanPath = pathname.split('?')[0].split('#')[0];

  const crumbs: BreadcrumbItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      isCurrent: cleanPath === '/dashboard',
    },
  ];

  const push = (name: string, href: string, isCurrent = false): void => {
    crumbs.push({ name, href, isCurrent });
  };

  if (VIEW_ROUTES[cleanPath]) {
    push(VIEW_ROUTES[cleanPath], cleanPath, true);
    return crumbs;
  }

  if (ADD_ROUTES[cleanPath]) {
    const { parent, addLabel, parentHref } = ADD_ROUTES[cleanPath];

    const parentHrefResolved =
      parentHref ||
      Object.entries(VIEW_ROUTES).find(([, label]) => label === parent)?.[0] ||
      '#';

    push(parent, parentHrefResolved, false);
    push(addLabel || 'Agregar', cleanPath, true);
    return crumbs;
  }

  if (cleanPath.startsWith('/dashboard/user/update-user/')) {
    push('Configuraciones', '/dashboard/settings', false);
    push('Modificar Ubicación', cleanPath, true);
    return crumbs;
  }

  const segments = cleanPath.split('/').filter(Boolean);
  let acc = '';
  segments.forEach((seg, idx) => {
    if (seg === 'dashboard') return;
    acc += `/${seg}`;
    const title =
      seg.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()) || '';
    crumbs.push({
      name: title,
      href: acc,
      isCurrent: idx === segments.length - 1,
    });
  });

  return crumbs;
}
