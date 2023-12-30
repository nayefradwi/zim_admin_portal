import toast from "svelte-french-toast";
import type { CreateRecipeInput, ProductVariant } from "../../data";

export interface AddRecipeVM {
  productName: string;
  recipeVariantName: string;
  recipeVariantSku: string;
  unitId: number;
  unitName: string;
  unitSymbol: string;
  quantity: number;
  totalCost: number;
}

export function toCreateRecipeInputs(
  resultVariantSku: string,
  recipes: AddRecipeVM[]
): CreateRecipeInput[] {
  return recipes.map((recipe) => ({
    resultVariantSku,
    quantity: recipe.quantity,
    recipeVariantSku: recipe.recipeVariantSku,
    unitId: recipe.unitId,
  }));
}

export function fromProductVariant(
  variant: ProductVariant,
  quantity: number
): AddRecipeVM | undefined {
  try {
    return {
      productName: variant.productName!,
      recipeVariantName: variant.name,
      recipeVariantSku: variant.sku,
      unitId: variant.standardUnit!.id,
      unitName: variant.standardUnit!.name,
      unitSymbol: variant.standardUnit!.symbol,
      quantity,
      totalCost: quantity * variant.price,
    };
  } catch (e: any) {
    toast.error(e);
  }
}
