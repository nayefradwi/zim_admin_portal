import {
    apiClient,
    type Ingredient,
    type Inventory,
    type PaginatedModel,
    type PaginationQuery
} from "..";

export interface IIngredientRepo {
    getIngredients(query?: PaginationQuery):
        Promise<PaginatedModel<Ingredient>>;
    getInventory(query?: PaginationQuery):
        Promise<PaginatedModel<Inventory>>;
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
    }
}
