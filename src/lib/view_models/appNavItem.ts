import {
    GridIcon, PackageIcon, TruckIcon,
    ShoppingBagIcon, UsersIcon,
    SettingsIcon, PieChartIcon,
    CheckSquareIcon,
} from "svelte-feather-icons";

export interface AppNavItemModel {
    path: string;
    name: string;
    icon: any | undefined;
    isLocked?: boolean;
}

export const HOME_NAVIGATION: AppNavItemModel[] = [
    {
        path: '/',
        name: 'Dashboard',
        icon: GridIcon,
    },
    {
        path: '/products',
        name: 'Products',
        icon: PackageIcon,
    },
    {
        path: '/inventory',
        name: 'Inventory',
        icon: TruckIcon,
    },
    {
        path: '/orders',
        name: 'Orders',
        icon: ShoppingBagIcon,
        isLocked: true,
    },
    {
        path: '/customers',
        name: 'Customers',
        isLocked: true,
        icon: UsersIcon,
    },
    {
        path: "/tasks",
        name: "Tasks",
        icon: CheckSquareIcon,
        isLocked: true,
    },
    {
        path: '/reports',
        name: 'Reports',
        icon: PieChartIcon,
        isLocked: true,
    },
    {
        path: '/settings',
        name: 'Settings',
        icon: SettingsIcon,
        isLocked: true,
    },
]
