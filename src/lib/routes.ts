export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const WAREHOUSE_SELECT_ROUTE = "/warehouse-select";
export const PRODUCTS_ROUTE = "/products";
export const RETAILERS_ROUTE = "/retailers";
export const ORDERS_ROUTE = "/orders";
export const CUSTOMERS_ROUTE = "/customers";
export const TASKS_ROUTE = "/tasks";
export const REPORTS_ROUTE = "/reports";
export const SETTINGS_ROUTE = "/settings";
export const PRODUCT_DETAILS_ROUTE = "/products/:id";
export const BATCH_DETAILS_ROUTE = "/batches/:id";
export const PRODUCT_VARIANT_DETAILS_ROUTE = "/products/variants/:id";
export const CREATE_RECIPES_ROUTE = "/products/variants/:sku/recipes/create";

export function getCreateRecipeRoute(sku: string) {
  return CREATE_RECIPES_ROUTE.replace(":sku", sku);
}

export function getProductDetailsRoute(id: string) {
  return PRODUCT_DETAILS_ROUTE.replace(":id", id);
}

export function getBatchDetailsRoute(id: string) {
  return BATCH_DETAILS_ROUTE.replace(":id", id);
}

export function getProductVariantDetailsRoute(id: string) {
  return PRODUCT_VARIANT_DETAILS_ROUTE.replace(":id", id);
}
