'use client';
import { FaBoxOpen, FaCashRegister, FaCogs, FaUserTie } from 'react-icons/fa';
import {
  MdOutlineAgriculture,
  MdContentCut,
  MdFlightTakeoff,
} from 'react-icons/md';
import {
  PRODUCER_MENU,
  CLIENT_MENU,
  BOX_BRANDS_MENU,
  EXPORT_MENU,
  getQualityMenu,
  getLiquidationMenu,
  getSettingsMenu,
} from './navMenus';
import { SidenavItem } from './sidenav-items';

export interface NavCounts {
  addCuttingSheet: number;
  addSupplyShipment: number;
  producerPendingPayments: number;
  clientPendingPayments: number;
}

export interface SessionUser {
  role?: string;
  exporterId?: string;
}

export function getNavItems(
  counts: NavCounts,
  session: SessionUser | null
): SidenavItem[] {
  const role = session?.role || 'USER';

  const navItems: SidenavItem[] = [
    {
      icon: MdOutlineAgriculture,
      label: 'Productor',
      isMenu: true,
      to: '/dashboard/producer',
      menu: PRODUCER_MENU,
      allowedRoles: ['LOGISTICS', 'EXPORT'],
    },
    {
      icon: FaUserTie,
      label: 'Comercialización',
      isMenu: true,
      to: '/dashboard/client',
      menu: CLIENT_MENU,
      allowedRoles: ['LOGISTICS', 'EXPORT'],
    },
    {
      icon: FaBoxOpen,
      label: 'Materiales',
      isMenu: true,
      to: '/dashboard/box-brands',
      menu: BOX_BRANDS_MENU,
      allowedRoles: ['LOGISTICS', 'EXPORT'],
    },
    {
      icon: MdFlightTakeoff,
      label: 'Exportaciones',
      isMenu: true,
      to: '/dashboard/export',
      menu: EXPORT_MENU,
      allowedRoles: ['EXPORT'],
    },
    {
      icon: MdContentCut,
      label: 'Calidad',
      isMenu: true,
      to: '/dashboard/export',
      menu: getQualityMenu({ addCuttingSheet: counts.addCuttingSheet }),
      count: counts.addCuttingSheet,
      allowedRoles: ['QUALITY'],
    },
    {
      icon: FaCashRegister,
      label: 'Liquidación',
      isMenu: true,
      to: '/dashboard/box-brands',
      menu: getLiquidationMenu({
        addSupplyShipment: counts.addSupplyShipment,
        producerPendingPayments: counts.producerPendingPayments,
        clientPendingPayments: counts.clientPendingPayments,
      }),
      count:
        counts.addSupplyShipment +
        counts.producerPendingPayments +
        counts.clientPendingPayments,
      allowedRoles: ['ADMINISTRATIVE'],
    },
    {
      icon: FaCogs,
      label: 'Configuraciones',
      isMenu: true,
      to: '/dashboard/settings',
      menu: getSettingsMenu(session?.exporterId),
      allowedRoles: ['ADMINISTRATIVE'],
    },
  ];

  return role === 'MASTER'
    ? navItems
    : navItems.filter(
        (item) => !item.allowedRoles || item.allowedRoles.includes(role)
      );
}
