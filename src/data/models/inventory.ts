import type { Ingredient, Unit } from ".";

export interface Inventory {
    id: number;
    ingredient: Ingredient;
    unit: Unit;
    updatedAt: string;
    quantity: number;
}
