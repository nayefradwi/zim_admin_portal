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

export interface TransactionStats {
  ReasonStatsLookup: Record<string, number>;
  TotalPositiveSum: number;
  TotalNegativeSum: number;
  NumberOfTransactions: number;
  NumberOfPositiveTransactions: number;
  NumberOfNegativeTransactions: number;
}

export function getTransactionStats(
  transactions: Transaction[]
): TransactionStats {
  const stats: TransactionStats = {
    ReasonStatsLookup: {},
    TotalPositiveSum: 0,
    TotalNegativeSum: 0,
    NumberOfTransactions: 0,
    NumberOfPositiveTransactions: 0,
    NumberOfNegativeTransactions: 0,
  };
  transactions.forEach((transaction) => {
    const { reason, amount, quantity } = transaction;
    const { name, isPositive } = reason;
    const currentValue = stats.ReasonStatsLookup[name] || 0;
    stats.ReasonStatsLookup[name] = currentValue + quantity;
    stats.NumberOfTransactions += 1;
    if (isPositive) {
      stats.TotalPositiveSum += amount;
      stats.NumberOfPositiveTransactions += 1;
    } else {
      stats.TotalNegativeSum += amount;
      stats.NumberOfNegativeTransactions += 1;
    }
  });
  return stats;
}
