import type { ProductVariant, Unit } from ".";

export interface Batch {
  id: number;
  sku: string;
  quantity: number;
  productVariant: ProductVariant;
  expiresAt: string;
  unit: Unit;
  productName: string;
  isIngredient: boolean;
}
