import { apiClient, type Batch, type PaginatedModel, type PaginationQuery, type Product } from "..";


export interface IProductRepo {
    getProducts(query?: PaginationQuery): Promise<PaginatedModel<Product>>;
    getBatches(query?: PaginationQuery): Promise<PaginatedModel<Batch>>;
    getProduct(id: string): Promise<Product>;
}

export const ProductRepo: IProductRepo = {
    getProducts: async (query?: PaginationQuery): Promise<PaginatedModel<Product>> => {
        if (!query) query = { pageSize: 10 };
        const response = await apiClient.get<PaginatedModel<Product>>('/products', {
            params: query
        });
        return response.data;
    },
    getProduct: async (id: string): Promise<Product> => {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
    },
    getBatches: async (query?: PaginationQuery):
        Promise<PaginatedModel<Batch>> => {
        const response = await apiClient.get<PaginatedModel<Batch>>(
            "/products/product-variants/batches/"
        );
        return response.data;
    }
}
