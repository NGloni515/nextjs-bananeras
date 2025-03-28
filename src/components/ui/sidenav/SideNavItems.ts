/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useSession } from 'next-auth/react';
import { FaBoxOpen, FaCashRegister, FaCogs, FaUserTie } from 'react-icons/fa';
import {
  MdContentCut,
  MdFlightTakeoff,
  MdOutlineAgriculture,
} from 'react-icons/md';
import { SidenavItem, SidenavMenuItem } from './sidenav-items';

export function GetUser() {
  const { data: session } = useSession();
  return session?.user;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNavItems(counts: any, session: any): SidenavItem[] {

  const productorMenu: SidenavMenuItem[] = [
    {
      label: 'Agregar Productor',
      to: '/dashboard/producer/add-producer',
      submenu: [
        {
          label: 'Consultar Productor',
          to: '/dashboard/producer/producers',
        },
      ],
    },
    {
      label: 'Agregar Finca',
      to: '/dashboard/producer/add-fincas',
      submenu: [
        {
          label: 'Consultar Finca',
          to: '/dashboard/producer/fincas',
        },
      ],
    },
    {
      label: 'Agregar Cuenta Bancaria',
      to: '/dashboard/producer/add-bank-account',
    },
  ];

  const clientMenu: SidenavMenuItem[] = [
    {
      label: 'Agregar Cliente',
      to: '/dashboard/client/add-client',
      submenu: [
        {
          label: 'Consultar Cliente',
          to: '/dashboard/client/clients',
        },
      ],
    },
    {
      label: 'Agregar Puerto',
      to: '/dashboard/client/add-harbor',
      submenu: [
        {
          label: 'Consultar Puerto',
          to: '/dashboard/client/harbors',
        },
      ],
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
      to: '/dashboard/client/add-harbor',
      submenu: [
        {
          label: 'Consultar Deposito',
          to: '/dashboard/client/harbors',
        },
      ],
    },
    {
      label: 'Agregar Transporte',
      to: '/dashboard/client/add-harbor',
      submenu: [
        {
          label: 'Consultar Transporte',
          to: '/dashboard/client/harbors',
        },
      ],
    },
    {
      label: 'Agregar Cuenta Bancaria',
      to: '/dashboard/client/add-bank-account',
      submenu: [
        {
          label: 'Cuentas Bancarias',
          to: '/dashboard/client/bank-accounts',
        },
      ],
    },
  ];

  const boxBrandsMenu: SidenavMenuItem[] = [
    {
      label: 'Agregar Alicuota',
      to: '/dashboard/box-brands/add-box-brand',
      submenu: [
        {
          label: 'Consultar Marca',
          to: '/dashboard/box-brands/search',
        },
      ],
    },
    {
      label: 'Agregar Logo',
      to: '/dashboard/box-brands/upload-logo',
    },
  ];

  const exportMenu: SidenavMenuItem[] = [
    {
      label: 'Iniciar Exportación',
      to: '/dashboard/export/add-export',
      submenu: [
        {
          label: 'Consultar Exportación',
          to: '/dashboard/export/search',
        },
      ],
    },
  ];

  const qualityMenu: SidenavMenuItem[] = [
    {
      label: 'Agregar Carta de Corte',
      to: '/dashboard/box-brands/add-cutting-type',
      submenu: [
        {
          label: 'Tipos de Corte',
          to: '/dashboard/box-brands/cutting-types',
        },
      ],
    },
    {
      label: 'Envio Carta de Corte',
      to: '/dashboard/export/add-cutting-sheet',
      count: counts.addCuttingSheet,
      submenu: [
        {
          label: 'Hojas de Corte',
          to: '/dashboard/export/cutting-sheets',
        },
      ],
    },
    {
      label: 'Agregar Verificadora',
      to: '/dashboard/box-brands/add-cutting-type',
      submenu: [
        {
          label: 'Consultar Verificadora',
          to: '/dashboard/box-brands/cutting-types',
        },
      ],
    },
  ];

  const liquidationMenu: SidenavMenuItem[] = [
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
  ];

  const settingsMenu: SidenavMenuItem[] = [
    {
      label: 'Modificar Logo',
      to: '/dashboard/settings/upload-logo',
    },
    {
      label: 'Modificar Ubicación',
      to: `/dashboard/user/update-user/${session?.user?.exporterId}`,
    },
    {
      label: 'Agregar Logo',
      to: '/dashboard/producer/upload-logo',
    },
  ];

  const navItems: SidenavItem[] = [
    {
      icon: MdOutlineAgriculture,
      label: 'Productor',
      isMenu: true,
      to: '/dashboard/producer',
      menu: productorMenu,
    },
    {
      icon: FaUserTie,
      label: 'Comercialización',
      isMenu: true,
      to: '/dashboard/client',
      menu: clientMenu,
    },
    {
      icon: FaBoxOpen,
      label: 'Materiales',
      isMenu: true,
      to: '/dashboard/box-brands',
      menu: boxBrandsMenu,
    },
    {
      icon: MdFlightTakeoff,
      label: 'Exportaciones',
      isMenu: true,
      to: '/dashboard/export',
      menu: exportMenu,
    },
    {
      icon: MdContentCut,
      label: 'Calidad',
      isMenu: true,
      to: '/dashboard/export',
      menu: qualityMenu,
      count: counts.addCuttingSheet,
    },
    {
      icon: FaCashRegister,
      label: 'Liquidación',
      isMenu: true,
      to: '/dashboard/box-brands',
      menu: liquidationMenu,
      count: counts.addSupplyShipment + counts.producerPendingPayments,
    },
    {
      icon: FaCogs,
      label: 'Configuraciones',
      isMenu: true,
      to: '/dashboard/settings',
      menu: settingsMenu,
    },
  ];

  return navItems;
}
