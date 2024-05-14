import type { Unit } from ".";

export interface Recipe {
  id: number;
  resultVariantId: number;
  resultVariantName: string;
  resultVariantSku: string;
  productName: string;
  quantity: number;
  unit: Unit;
  recipeVariantId: number;
  recipeVariantName: string;
  recipeVariantSku: string;
  ingredientCost: number;
  ingredientStandardUnit: Unit;
}
