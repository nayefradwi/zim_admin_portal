export interface AppNavItemModel {
    path: string;
    name: string;
    icon: string;
    isLocked?: boolean;
}

export const HOME_NAVIGATION: AppNavItemModel[] = [
    {
        path: '/',
        name: 'Dashboard',
        icon: 'dashboard',
    },
    {
        path: '/products',
        name: 'Products',
        icon: 'shopping_cart',
    },
    {
        path: '/inventory',
        name: 'Inventory',
        icon: 'inventory',
    },
    {
        path: '/orders',
        name: 'Orders',
        icon: 'shopping_bag',
        isLocked: true,
    },
    {
        path: '/customers',
        name: 'Customers',
        icon: 'people',
        isLocked: true,
    },
    {
        path: "/tasks",
        name: "Tasks",
        icon: "task",
        isLocked: true,
    },
    {
        path: '/reports',
        name: 'Reports',
        icon: 'bar_chart',
        isLocked: true,
    },
    {
        path: '/settings',
        name: 'Settings',
        icon: 'settings',
        isLocked: true,
    },
]
