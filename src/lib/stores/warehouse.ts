import { writable } from "svelte/store";
import {
  WarehouseRepo,
  type IWarehouseRepo,
  type Warehouse,
  type ResponseHandlerData,
  ClientError,
  getResponse,
} from "../../data";

function createWarehouseStore() {
  const store = writable<Warehouse | null>(null);
  const { subscribe, set } = store;
  return {
    subscribe,
    set,
    getCurrentWarehouse: () => GetCurrentWarehouse(WarehouseRepo),
  };
}

export const warehouseStore = createWarehouseStore();

function GetCurrentWarehouse(warehouseRepo: IWarehouseRepo) {
  const details: ResponseHandlerData<Warehouse> = {
    call: () => warehouseRepo.getCurrentWarehouse(),
    onSuccess: (data: Warehouse) => {
      warehouseStore.set(data);
    },
  };
  return getResponse<Warehouse>(details);
}
