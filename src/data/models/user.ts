import type { Warehouse } from "./warehouse";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    warehouses: Warehouse[] | undefined;
}
