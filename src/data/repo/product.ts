import { apiClient, type PaginatedModel, type PaginationQuery, type Product } from "..";


export interface IProductRepo {
    getProducts(query?: PaginationQuery): Promise<PaginatedModel<Product>>;
}

export const ProductRepo: IProductRepo = {
    getProducts: async (query?: PaginationQuery): Promise<PaginatedModel<Product>> => {
        if (!query) query = { pageSize: 10 };
        const response = await apiClient.get<PaginatedModel<Product>>('/products', {
            params: query
        });
        return response.data;
    }
}
