import type { Unit } from ".";
import type { Recipe } from "./recipe";

export interface Product {
  id: number;
  name: string;
  description: string;
  image?: string;
  isArchived?: boolean;
  options?: Record<string, ProductOption>;
  productVariants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  productId: number;
  name: string;
  productName?: string;
  sku: string;
  image?: string;
  price: number;
  width?: number;
  height?: number;
  depth?: number;
  weight?: number;
  standardUnit?: Unit;
  isArchived?: boolean;
  isDefault?: boolean;
  expiresInDays?: number;
  totalCost?: number;
  recipes?: Recipe[];
}

export interface ProductOption {
  id?: number;
  name: string;
  values: ProductOptionValue[];
}

export interface ProductOptionValue {
  id?: number;
  value: string;
}

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  standardUnitId: number;
  expiresInDays: number;
  isIngredient: boolean;
  options: ProductOption[];
}
