import { apiClient, type Warehouse } from "..";

export interface IWarehouseRepo {
    getWarehouses(): Promise<Warehouse[]>;
}

export const WarehouseRepo = {
    getWarehouses: async (): Promise<Warehouse[]> => {
        const response = await apiClient.get<Warehouse[]>("/warehouses");
        return response.data as Warehouse[];
    }
}
