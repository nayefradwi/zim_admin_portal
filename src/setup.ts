import { navigate } from "svelte-routing";
import {
  getTokensFromSession,
  getWarehouseSelected,
  setAuthHeader,
  setWarehouseHeader,
  type Product,
  type Batch,
} from "./data";
import { HOME_ROUTE, LOGIN_ROUTE, WAREHOUSE_SELECT_ROUTE } from "./lib/routes";
import { userStore } from "./lib/stores/user";
import { warehouseStore } from "./lib/stores/warehouse";
import { unitStore } from "./lib/stores/unit";
import {
  batchStore,
  productStore,
  type PaginationState,
  ingredientStore,
} from "./lib/stores/pagination";
import { transactionReasonsStore } from "./lib/stores/transaction";

export async function setup(): Promise<string> {
  try {
    const token = getTokensFromSession();
    if (!token) return LOGIN_ROUTE;
    setAuthHeader(token.accessToken);
    await userStore.getUser();
    if (!userStore) return LOGIN_ROUTE;
    const warehouseId = getWarehouseSelected();
    if (!warehouseId) return WAREHOUSE_SELECT_ROUTE;
    setWarehouseHeader(warehouseId);
    await warehouseStore.getCurrentWarehouse();
    if (!warehouseStore) return WAREHOUSE_SELECT_ROUTE;
    loadData();
    return window.location.pathname;
  } catch (e) {
    console.log("Error in setup");
    console.error(e);
    return LOGIN_ROUTE;
  }
}

export function loadData() {
  unitStore.getUnits();
  transactionReasonsStore.getReasons();
  let emptyBatchState: PaginationState<Batch> = {
    pageNumber: 1,
    isLoading: false,
    page: null,
  };
  batchStore.refresh(emptyBatchState);
  let emptyProductState: PaginationState<Product> = {
    pageNumber: 1,
    isLoading: false,
    page: null,
  };
  productStore.refresh(emptyProductState);
  let emptyIngredientState: PaginationState<Product> = {
    pageNumber: 1,
    isLoading: false,
    page: null,
  };
  ingredientStore.refresh(emptyIngredientState);
}
