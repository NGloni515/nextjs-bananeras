'use client';
import { FaBoxOpen, FaCashRegister, FaCogs, FaUserTie } from 'react-icons/fa';
import {
  MdOutlineAgriculture,
  MdContentCut,
  MdFlightTakeoff,
} from 'react-icons/md';
import { PiPackageBold } from 'react-icons/pi';
import {
  PRODUCER_MENU,
  CLIENT_MENU,
  BOX_BRANDS_MENU,
  getQualityMenu,
  getLiquidationMenu,
  getSettingsMenu,
  WINERY_MENU,
  getExportMenu,
} from './navMenus';
import { SidenavItem } from './sidenav-items';

export interface NavCounts {
  addCuttingSheet: number;
  addSupplyShipment: number;
  producerPendingPayments: number;
  clientPendingPayments: number;
  exportSentCostsPending: number;
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
      menu: getExportMenu({
        addSupplyShipment: counts.addSupplyShipment,
      }),
      count: counts.addSupplyShipment,
      allowedRoles: ['EXPORT'],
    },
    {
      icon: FaCashRegister,
      label: 'Liquidación',
      isMenu: true,
      to: '/dashboard/box-brands',
      menu: getLiquidationMenu({
        producerPendingPayments: counts.producerPendingPayments,
        clientPendingPayments: counts.clientPendingPayments,
        exportSentCostsPending: counts.exportSentCostsPending,
      }),
      count:
        counts.producerPendingPayments +
        counts.clientPendingPayments +
        counts.exportSentCostsPending,
      allowedRoles: ['ADMINISTRATIVE'],
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
      icon: PiPackageBold,
      label: 'Bodega',
      isMenu: true,
      to: '/dashboard/winery',
      menu: WINERY_MENU,
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
