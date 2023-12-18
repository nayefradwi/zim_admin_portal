import type { Unit } from ".";

export interface TransactionReason {
  id: number;
  name: string;
  isPositive: boolean;
}

export interface Transaction {
  id: number;
  userId: number;
  batchId?: number;
  retailerBatchId?: number;
  warehouseId: number;
  retailerId?: number;
  quantity: number;
  unit: Unit;
  amount: number;
  reason: TransactionReason;
  createdAt: string;
  sku: string;
}
