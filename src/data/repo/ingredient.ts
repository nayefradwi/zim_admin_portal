import { apiClient, type Ingredient, type PaginatedModel, type PaginationQuery } from "..";

export interface IIngredientRepo {
    getIngredients(query?: PaginationQuery): Promise<PaginatedModel<Ingredient>>;
}


export const IngredientRepo: IIngredientRepo = {
    getIngredients: async (query?: PaginationQuery): Promise<PaginatedModel<Ingredient>> => {
        if (!query) query = { pageSize: 10 };
        const response = await apiClient.get<PaginatedModel<Ingredient>>('/products/ingredients/', {
            params: query
        });
        return response.data;
    }
}
