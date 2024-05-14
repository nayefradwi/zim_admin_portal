import {
  PackageIcon,
  TruckIcon,
  ShoppingBagIcon,
  UsersIcon,
  SettingsIcon,
  PieChartIcon,
  CheckSquareIcon,
} from "svelte-feather-icons";
import {
  CUSTOMERS_ROUTE,
  HOME_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  REPORTS_ROUTE,
  RETAILERS_ROUTE,
  SETTINGS_ROUTE,
  TASKS_ROUTE,
} from "../routes";

export interface AppNavItemModel {
  path: string;
  name: string;
  icon: any | undefined;
  isLocked?: boolean;
}

export const HOME_NAVIGATION: AppNavItemModel[] = [
  {
    path: HOME_ROUTE,
    name: "Inventory",
    icon: TruckIcon,
  },
  {
    path: PRODUCTS_ROUTE,
    name: "Products",
    icon: PackageIcon,
  },
  {
    path: RETAILERS_ROUTE,
    name: "Retail Partners",
    icon: TruckIcon,
    isLocked: true,
  },
  {
    path: ORDERS_ROUTE,
    name: "Orders",
    icon: ShoppingBagIcon,
    isLocked: true,
  },
  {
    path: CUSTOMERS_ROUTE,
    name: "Customers",
    isLocked: true,
    icon: UsersIcon,
  },
  {
    path: TASKS_ROUTE,
    name: "Tasks",
    icon: CheckSquareIcon,
    isLocked: true,
  },
  {
    path: REPORTS_ROUTE,
    name: "Reports",
    icon: PieChartIcon,
    isLocked: true,
  },
  {
    path: SETTINGS_ROUTE,
    name: "Settings",
    icon: SettingsIcon,
    isLocked: true,
  },
];
