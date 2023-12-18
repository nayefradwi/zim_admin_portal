import { apiClient, type Transaction, type TransactionReason } from "..";

export interface ITransactionRepo {
  getReasons(): Promise<TransactionReason[]>;
  getTransactionsOfBatch(batchId: string): Promise<Transaction[]>;
}

export const TransactionRepo: ITransactionRepo = {
  getReasons: async (): Promise<TransactionReason[]> => {
    const response = await apiClient.get<TransactionReason[]>(
      "/transactions/reasons"
    );
    console.log(response.data);
    return response.data;
  },

  getTransactionsOfBatch: async (batchId: string): Promise<Transaction[]> => {
    const response = await apiClient.get<Transaction[]>(
      `/transactions/batch/${batchId}`
    );
    return response.data;
  },
};
