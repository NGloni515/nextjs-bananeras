import { SidenavMenuItem } from './sidenav-items';

export const PRODUCER_MENU: SidenavMenuItem[] = [
  {
    label: 'Agregar Productor',
    to: '/dashboard/producer/add-producer',
    submenu: [
      { label: 'Consultar Productor', to: '/dashboard/producer/producers' },
    ],
  },
  {
    label: 'Agregar Finca',
    to: '/dashboard/producer/add-fincas',
    submenu: [{ label: 'Consultar Finca', to: '/dashboard/producer/fincas' }],
  },
  {
    label: 'Agregar Cuenta Bancaria',
    to: '/dashboard/producer/add-bank-account',
  },
];

export const CLIENT_MENU: SidenavMenuItem[] = [
  {
    label: 'Agregar Cliente',
    to: '/dashboard/client/add-client',
    submenu: [{ label: 'Consultar Cliente', to: '/dashboard/client/clients' }],
  },
  {
    label: 'Agregar Puerto',
    to: '/dashboard/client/add-harbor',
    submenu: [{ label: 'Consultar Puerto', to: '/dashboard/client/harbors' }],
  },
  {
    label: 'Agregar Naviera',
    to: '/dashboard/client/add-shipping-company',
    submenu: [
      {
        label: 'Consultar Naviera',
        to: '/dashboard/client/shipping-companies',
      },
    ],
  },
  {
    label: 'Agregar Deposito',
    to: '/dashboard/client/add-deposit',
    submenu: [
      { label: 'Consultar Deposito', to: '/dashboard/client/deposits' },
    ],
  },
  {
    label: 'Agregar Transporte',
    to: '/dashboard/client/add-transport',
    submenu: [
      { label: 'Consultar Transporte', to: '/dashboard/client/transports' },
    ],
  },
];

export const BOX_BRANDS_MENU: SidenavMenuItem[] = [
  {
    label: 'Agregar Alícuota',
    to: '/dashboard/box-brands/add-box-brand',
    submenu: [
      { label: 'Consultar Alícuota', to: '/dashboard/box-brands/search' },
    ],
  },
  { label: 'Agregar Logo', to: '/dashboard/box-brands/upload-logo' },
];

export const WINERY_MENU: SidenavMenuItem[] = [
  {
    label: 'Carga de Materiales',
    to: '/dashboard/winery/add-material',
    submenu: [{ label: 'Consultar Stock', to: '/dashboard/winery/stock' }],
  },
  {
    label: 'Trazabilidad de Stock',
    to: '/dashboard/winery/stock-movements',
    submenu: [
      {
        label: 'Ajuste Semanal',
        to: '/dashboard/winery/adjust-weekly',
      },
    ],
  },
];

export function getExportMenu(counts: {
  addSupplyShipment: number;
}): SidenavMenuItem[] {
  return [
    {
      label: 'Iniciar Exportación',
      to: '/dashboard/export/add-export',
      submenu: [
        { label: 'Consultar Exportación', to: '/dashboard/export/search' },
      ],
    },
    {
      label: 'Envío de Insumos',
      to: '/dashboard/liquidation/add-supply-shipment',
      count: counts.addSupplyShipment,
      submenu: [
        {
          label: 'Envíos Realizados',
          to: '/dashboard/liquidation/exports-sent',
        },
      ],
    },
  ];
}

export function getQualityMenu(counts: {
  addCuttingSheet: number;
}): SidenavMenuItem[] {
  return [
    {
      label: 'Agregar Carta de Corte',
      to: '/dashboard/box-brands/add-cutting-type',
      submenu: [
        { label: 'Tipos de Corte', to: '/dashboard/box-brands/cutting-types' },
      ],
    },
    {
      label: 'Envio Carta de Corte',
      to: '/dashboard/export/add-cutting-sheet',
      count: counts.addCuttingSheet,
      submenu: [
        { label: 'Hojas de Corte', to: '/dashboard/export/cutting-sheets' },
      ],
    },
    {
      label: 'Agregar Verificadora',
      to: '/dashboard/box-brands/add-verifier',
      submenu: [
        {
          label: 'Consultar Verificadora',
          to: '/dashboard/box-brands/verifiers',
        },
      ],
    },
  ];
}

export function getLiquidationMenu(counts: {
  producerPendingPayments: number;
  clientPendingPayments: number;
  exportSentCostsPending: number;
}): SidenavMenuItem[] {
  return [
    {
      label: 'Costo de Exportación',
      to: '/dashboard/liquidation/add-export-cost',
      count: counts.exportSentCostsPending,
      submenu: [
        {
          label: 'Costos Validados',
          to: '/dashboard/liquidation/export-costs',
        },
      ],
    },
    {
      label: 'Pago a Productores',
      to: '/dashboard/liquidation/producer-pending-payments',
      count: counts.producerPendingPayments,
      submenu: [
        {
          label: 'Pagos Realizados',
          to: '/dashboard/liquidation/producer-payments',
        },
      ],
    },
    {
      label: 'Cobro a Clientes',
      to: '/dashboard/liquidation/client-pending-payments',
      count: counts.clientPendingPayments,
      submenu: [
        {
          label: 'Pagos Realizados',
          to: '/dashboard/liquidation/client-payments',
        },
      ],
    },
    {
      label: 'Agregar Cuenta Bancaria',
      to: '/dashboard/client/add-bank-account',
      submenu: [
        { label: 'Cuentas Bancarias', to: '/dashboard/client/bank-accounts' },
      ],
    },
  ];
}

export function getSettingsMenu(exporterId?: string): SidenavMenuItem[] {
  return [
    { label: 'Logo Exportadora', to: '/dashboard/settings/upload-logo' },
    {
      label: 'Modificar Ubicación',
      to: `/dashboard/user/update-user/${exporterId}`,
    },
    { label: 'Logo Productores', to: '/dashboard/producer/upload-logo' },
  ];
}
