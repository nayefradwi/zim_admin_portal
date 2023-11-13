import type { Unit } from ".";

export interface Product {
    id: number;
    name: string;
    description: string;
    image?: string;
    isArchived?: boolean;
    options: Record<string, ProductOption>;
    productVariants: ProductVariant[];
}

export interface ProductVariant {
    id: number;
    productId: number;
    name: string;
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

}

export interface ProductOption {
    id: number;
    name: string;
    values: ProductOptionValue[];
}

export interface ProductOptionValue {
    id: number;
    value: string;
}
