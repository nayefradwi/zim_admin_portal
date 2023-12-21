import {
  apiClient,
  type Batch,
  type PaginatedModel,
  type PaginationQuery,
  type Product,
  type ProductInput,
} from "..";

export interface IProductRepo {
  getProducts(query?: PaginationQuery): Promise<PaginatedModel<Product>>;
  getIngredients(query?: PaginationQuery): Promise<PaginatedModel<Product>>;
  getBatches(query?: PaginationQuery): Promise<PaginatedModel<Batch>>;
  getProduct(id: string): Promise<Product>;
  incrementBatch(request: ModifyBatchRequest): Promise<void>;
  decrementBatch(request: ModifyBatchRequest): Promise<void>;
  incrementBatchWithRecipe(request: ModifyBatchRequest): Promise<void>;
  getBatchesBySku(sku: string): Promise<PaginatedModel<Batch>>;
  getBatchById(id: string): Promise<Batch>;
  createProduct(input: ProductInput): Promise<void>;
}

export interface ModifyBatchRequest {
  id?: number;
  sku: string;
  unitId: number;
  quantity: number;
  reason: string;
  comment?: string;
}

export const ProductRepo: IProductRepo = {
  getProducts: async (
    query?: PaginationQuery
  ): Promise<PaginatedModel<Product>> => {
    if (!query) query = { pageSize: 10 };
    const response = await apiClient.get<PaginatedModel<Product>>("/products", {
      params: {
        ...query,
        isIngredient: false,
      },
    });
    return response.data;
  },
  getIngredients: async (
    query?: PaginationQuery
  ): Promise<PaginatedModel<Product>> => {
    if (!query) query = { pageSize: 10 };
    const response = await apiClient.get<PaginatedModel<Product>>("/products", {
      params: {
        ...query,
        isIngredient: true,
      },
    });
    return response.data;
  },
  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
  getBatches: async (
    query?: PaginationQuery
  ): Promise<PaginatedModel<Batch>> => {
    const response = await apiClient.get<PaginatedModel<Batch>>(
      "/products/product-variants/batches/",
      {
        params: query,
      }
    );
    return response.data;
  },
  incrementBatch: async (request: ModifyBatchRequest): Promise<void> => {
    const response = await apiClient.post<void>(
      "/products/product-variants/batches/batch/stock",
      request
    );
    return response.data;
  },

  decrementBatch: async (request: ModifyBatchRequest): Promise<void> => {
    const response = await apiClient.delete<void>(
      "/products/product-variants/batches/batch/stock",
      {
        data: request,
      }
    );
    return response.data;
  },

  getBatchesBySku: async (sku: string): Promise<PaginatedModel<Batch>> => {
    const response = await apiClient.get<PaginatedModel<Batch>>(
      "/products/product-variants/batches/search",
      {
        params: {
          sku,
        },
      }
    );
    return response.data;
  },
  incrementBatchWithRecipe: async (
    request: ModifyBatchRequest
  ): Promise<void> => {
    const response = await apiClient.post<void>(
      "/products/product-variants/batches/batch/stock/with-recipe",
      request
    );
    return response.data;
  },

  getBatchById: async (id: string): Promise<Batch> => {
    const response = await apiClient.get<Batch>(
      `/products/product-variants/batches/${id}`
    );
    return response.data;
  },

  createProduct: async (input: ProductInput): Promise<void> => {
    const response = await apiClient.post<void>("/products", input);
    return response.data;
  },
};
