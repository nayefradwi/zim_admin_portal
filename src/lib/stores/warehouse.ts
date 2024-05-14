import { writable } from "svelte/store";
import {
  WarehouseRepo,
  type IWarehouseRepo,
  type Warehouse,
  type ResponseHandlerData,
  getResponse,
} from "../../data";

function createWarehouseStore() {
  const store = writable<Warehouse | null>(null);
  const { subscribe, set } = store;
  return {
    subscribe,
    set,
    getCurrentWarehouse: () => {
      const details: ResponseHandlerData<Warehouse> = {
        call: () => WarehouseRepo.getCurrentWarehouse(),
        onSuccess: (data: Warehouse) => {
          set(data);
        },
      };
      return getResponse<Warehouse>(details);
    },
  };
}

export const warehouseStore = createWarehouseStore();
