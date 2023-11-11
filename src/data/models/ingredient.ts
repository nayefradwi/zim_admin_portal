import type { Unit } from ".";

export interface Ingredient {
    id: number;
    name: string;
    brand?: string;
    price: number;
    expiresInDays: number;
    standardQuantity: number;
    standardUnit?: Unit;
}


