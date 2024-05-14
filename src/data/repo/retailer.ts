import {
  apiClient,
  type PaginatedModel,
  type PaginationQuery,
  type Retailer,
  type RetailerBatch,
} from "..";

export interface IRetailerRepo {
  createRetailer(input: CreateRetailerInput): Promise<void>;
  addRetailerContact(
    id: number,
    input: CreateRetailerContactInput
  ): Promise<void>;
  updateRetailer(input: UpdateRetailerInput): Promise<void>;
  getRetailer(id: number): Promise<Retailer>;
  getRetailers(): Promise<PaginatedModel<Retailer>>;
  deleteRetailer(id: number): Promise<void>;
  deleteRetailerContact(id: number): Promise<void>;
  incrementRetailerBatch(input: ModifyRetailerBatchInput): Promise<void>;
  decrementRetailerBatch(input: ModifyRetailerBatchInput): Promise<void>;
  getBatchesOfRetailer(
    retailerId: number,
    query?: PaginationQuery
  ): Promise<RetailerBatch[]>;
  getBatches(query?: PaginationQuery): Promise<RetailerBatch[]>;
}

export interface CreateRetailerInput {
  name: string;
  lat: number;
  lng: number;
  contacts: CreateRetailerContactInput[];
}

export interface CreateRetailerContactInput {
  name: string;
  position: string;
  email?: string;
  phone: string;
  website?: string;
}

export interface UpdateRetailerInput {
  name: string;
  lat: number;
  lng: number;
}

export interface ModifyRetailerBatchInput {
  id?: number;
  quantity: number;
  unitId: number;
  sku: string;
  retailerId: number;
  reason: string;
}

export const RetailerRepo: IRetailerRepo = {
  createRetailer: async (input: CreateRetailerInput): Promise<void> => {
    const response = await apiClient.post("/retailers", input);
    return response.data;
  },
  addRetailerContact: async (
    id: number,
    input: CreateRetailerContactInput
  ): Promise<void> => {
    const response = await apiClient.post(`/retailers/${id}/contact`, input);
    return response.data;
  },
  updateRetailer: async (input: UpdateRetailerInput): Promise<void> => {
    const response = await apiClient.put(`/retailers`, input);
    return response.data;
  },
  getRetailer: async (id: number): Promise<Retailer> => {
    const response = await apiClient.get<Retailer>(`/retailers/${id}`);
    return response.data;
  },
  getRetailers: async (): Promise<PaginatedModel<Retailer>> => {
    const response = await apiClient.get<PaginatedModel<Retailer>>(
      `/retailers`
    );
    return response.data;
  },
  deleteRetailer: async (id: number): Promise<void> => {
    const response = await apiClient.delete(`/retailers/${id}`);
    return response.data;
  },
  deleteRetailerContact: async (id: number): Promise<void> => {
    const response = await apiClient.delete(`/retailers/contact/${id}`);
    return response.data;
  },
  incrementRetailerBatch: async (
    input: ModifyRetailerBatchInput
  ): Promise<void> => {
    const response = await apiClient.post(
      `/retailers/batches/batch/stock`,
      input
    );
    return response.data;
  },
  decrementRetailerBatch: async (
    input: ModifyRetailerBatchInput
  ): Promise<void> => {
    const response = await apiClient.delete(`/retailers/batches/batch/stock`, {
      data: input,
    });
    return response.data;
  },
  getBatchesOfRetailer: async (
    retailerId: number,
    query?: PaginationQuery
  ): Promise<RetailerBatch[]> => {
    const response = await apiClient.get<RetailerBatch[]>(
      `/retailers/${retailerId}/batches`,
      {
        params: query,
      }
    );
    return response.data;
  },

  getBatches: async (query?: PaginationQuery): Promise<RetailerBatch[]> => {
    const response = await apiClient.get<RetailerBatch[]>(
      `/retailers/batches`,
      {
        params: query,
      }
    );
    return response.data;
  },
};
