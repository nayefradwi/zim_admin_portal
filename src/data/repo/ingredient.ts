import {
    apiClient,
    type Ingredient,
    type Inventory,
    type PaginatedModel,
    type PaginationQuery
} from "..";
export interface ModifyInventoryRequest {
    ingredientId: number;
    quantity: number;
    unitId: number;
}
export interface IIngredientRepo {
    getIngredients(query?: PaginationQuery):
        Promise<PaginatedModel<Ingredient>>;
    getInventory(query?: PaginationQuery):
        Promise<PaginatedModel<Inventory>>;
    incrementInventory(data: ModifyInventoryRequest): Promise<void>;
    decrementInventory(data: ModifyInventoryRequest): Promise<void>;
}


export const IngredientRepo: IIngredientRepo = {
    getIngredients: async (query?: PaginationQuery):
        Promise<PaginatedModel<Ingredient>> => {
        if (!query) query = { pageSize: 10 };
        const response = await apiClient.
            get<PaginatedModel<Ingredient>>('/products/ingredients/', {
                params: query
            });
        return response.data;
    },
    getInventory: async (query?: PaginationQuery):
        Promise<PaginatedModel<Inventory>> => {
        if (!query) query = { pageSize: 10 };
        const response = await apiClient.
            get<PaginatedModel<Inventory>>('/products/ingredients/inventories/', {
                params: query
            });
        return response.data;
    },
    incrementInventory: async (data: ModifyInventoryRequest): Promise<void> => {
        const response = await apiClient.post(
            '/products/ingredients/inventories/inventory/stock', data
        )
        return response.data;
    },
    decrementInventory: async (data: ModifyInventoryRequest): Promise<void> => {
        const response = await apiClient.delete(
            '/products/ingredients/inventories/inventory/stock',
            {
                data: data
            }
        )
        return response.data;
    }

}
