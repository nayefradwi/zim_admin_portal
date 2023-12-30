import { apiClient } from "..";

export interface IRecipeRepo {
  createRecipe: (inputs: CreateRecipeInput[]) => Promise<void>;
  addRecipe: (input: CreateRecipeInput) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
}

export interface CreateRecipeInput {
  resultVariantSku: string;
  quantity: number;
  recipeVariantSkus: string;
  unitId: string;
}

export const RecipeRepo: IRecipeRepo = {
  createRecipe: async (inputs: CreateRecipeInput[]) => {
    const response = await apiClient.post(
      "/products/product-variants/recipes",
      inputs
    );
    return response.data;
  },

  addRecipe: async (input: CreateRecipeInput) => {
    const response = await apiClient.put(
      "/products/product-variants/recipes/recipe",
      input
    );
    return response.data;
  },

  deleteRecipe: async (id: string) => {
    const response = await apiClient.delete(
      `/products/product-variants/recipes/${id}`
    );
    return response.data;
  },
};
