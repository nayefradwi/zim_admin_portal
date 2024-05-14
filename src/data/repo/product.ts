import {
  apiClient,
  type Batch,
  type PaginatedModel,
  type PaginationQuery,
  type Product,
  type ProductInput,
  type ProductVariant,
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
  updateProductSku(request: UpdateSkuRequest): Promise<void>;
  updateProductVariantDetails(
    request: UpdateProductVariantDetailsRequest
  ): Promise<void>;
  getProductVariantById(id: string): Promise<ProductVariant>;
  createBatch(request: CreateBatchRequest): Promise<void>;
  createBatchWithRecipe(request: CreateBatchRequest): Promise<void>;
  archiveProduct(id: string): Promise<void>;
  archiveProductVariant(id: string): Promise<void>;
  unarchiveProduct(id: string): Promise<void>;
  unarchiveProductVariant(id: string): Promise<void>;
  deleteProductVariant(id: string): Promise<void>;
  searchProductVariantByName(
    names: string,
    query?: PaginationQuery
  ): Promise<PaginatedModel<ProductVariant>>;
  getProductVariantBySku(
    sku: string,
    withRecipe?: boolean
  ): Promise<ProductVariant>;
  deleteProduct(id: string): Promise<void>;
  addProductVariant(request: AddProductVariantRequest): Promise<void>;
  addProductOptionValue(request: AddProductOptionValueRequest): Promise<void>;
  addProductOption(request: AddProductOptionRequest): Promise<void>;
}

export interface ModifyBatchRequest {
  id?: number;
  sku: string;
  unitId: number;
  quantity: number;
  reason: string;
  comment?: string;
}

export interface CreateBatchRequest {
  sku: string;
  unitId: number;
  quantity: number;
  reason: string;
  comment?: string;
}

export interface UpdateSkuRequest {
  oldSku: string;
  newSku: string;
}

export interface UpdateProductVariantDetailsRequest {
  id: number;
  price: number;
  widthInCm?: number;
  heightInCm?: number;
  depthInCm?: number;
  weightInG?: number;
}

export interface AddProductVariantRequest {
  productVariant: ProductVariant & {
    standardUnitId: number;
  };
  optionsValueIds: number[];
}

export interface AddProductOptionValueRequest {
  productOptionId: number;
  value: string;
}

export interface AddProductOptionRequest {
  productId: number;
  optionName: string;
  values: {
    value: string;
    isDefault: boolean;
  }[];
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

  updateProductSku: async (request: UpdateSkuRequest): Promise<void> => {
    const response = await apiClient.put<void>(
      "/products/product-variants/sku",
      request
    );
    return response.data;
  },

  updateProductVariantDetails: async (
    request: UpdateProductVariantDetailsRequest
  ): Promise<void> => {
    const response = await apiClient.put<void>(
      "/products/product-variants/",
      request
    );
    return response.data;
  },

  getProductVariantById: async (id: string): Promise<ProductVariant> => {
    const response = await apiClient.get<ProductVariant>(
      `/products/product-variants/${id}`
    );
    return response.data;
  },

  createBatch: async (request: CreateBatchRequest): Promise<void> => {
    const response = await apiClient.post<void>(
      "/products/product-variants/batches/batch/stock",
      request
    );
    return response.data;
  },

  createBatchWithRecipe: async (request: CreateBatchRequest): Promise<void> => {
    const response = await apiClient.post<void>(
      "/products/product-variants/batches/batch/stock/with-recipe",
      request
    );
    return response.data;
  },
  archiveProduct: async (id: string): Promise<void> => {
    const response = await apiClient.put<void>(`/products/${id}/archive`);
    return response.data;
  },
  archiveProductVariant: async (id: string): Promise<void> => {
    const response = await apiClient.put<void>(
      `/products/product-variants/${id}/archive`
    );
    return response.data;
  },
  unarchiveProduct: async (id: string): Promise<void> => {
    const response = await apiClient.put<void>(`/products/${id}/unarchive`);
    return response.data;
  },
  unarchiveProductVariant: async (id: string): Promise<void> => {
    const response = await apiClient.put<void>(
      `/products/product-variants/${id}/unarchive`
    );
    return response.data;
  },

  deleteProductVariant: async (id: string): Promise<void> => {
    const response = await apiClient.delete<void>(
      `/products/product-variants/${id}`
    );
    return response.data;
  },

  searchProductVariantByName: async (
    name: string,
    query?: PaginationQuery
  ): Promise<PaginatedModel<ProductVariant>> => {
    const response = await apiClient.post<PaginatedModel<ProductVariant>>(
      "/products/product-variants/search",
      {},
      {
        params: {
          name: name,
          ...query,
        },
      }
    );
    return response.data;
  },

  getProductVariantBySku: async (
    sku: string,
    withRecipe?: boolean
  ): Promise<ProductVariant> => {
    const response = await apiClient.get<ProductVariant>(
      `/products/product-variants/sku/${sku}`,
      {
        params: {
          withRecipe: withRecipe,
        },
      }
    );
    return response.data;
  },
  deleteProduct: async (id: string): Promise<void> => {
    const response = await apiClient.delete<void>(`/products/${id}`);
    return response.data;
  },
  addProductVariant: async (
    request: AddProductVariantRequest
  ): Promise<void> => {
    const response = await apiClient.post<void>(
      "/products/product-variants",
      request
    );
    return response.data;
  },

  addProductOptionValue: async (
    request: AddProductOptionValueRequest
  ): Promise<void> => {
    const response = await apiClient.post<void>(
      "/products/product-variants/options/values",
      request
    );
    return response.data;
  },

  addProductOption: async (request: AddProductOptionRequest): Promise<void> => {
    const response = await apiClient.post<void>("/products/options", request);
    return response.data;
  },
};
