import type { ProductVariant, Unit } from ".";

export interface Retailer {
  id: number;
  name: string;
  lat: number;
  lng: number;
  contacts: RetailerContact[];
}

export interface RetailerContact {
  id: number;
  name: string;
  position: string;
  email?: string;
  phone: string;
  website?: string;
}

export interface RetailerBatch {
  id: number;
  retailerId: number;
  sku: string;
  quantity: number;
  expiresAt: string;
  productVariant: ProductVariant;
  unit: Unit;
  productName: string;
  retailerName: string;
}
