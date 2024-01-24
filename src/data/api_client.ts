import axios from "axios";
import { ClientError } from "./models/error";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {},
});

export function setAuthHeader(accessToken: string | null) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

export function setWarehouseHeader(warehouseId: number | null) {
  apiClient.defaults.headers.common["X-Warehouse-Id"] =
    warehouseId != null ? warehouseId.toString() : null;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const clientError = new ClientError(
        error.response.data.message,
        error.response.data.code,
        error.response.data.field
      );
      return Promise.reject(clientError);
    } catch (_) {
      return Promise.reject(error);
    }
  }
);
