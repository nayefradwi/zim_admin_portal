import { apiClient, type TransactionReason } from "..";

export interface ITransactionRepo {
  getReasons(): Promise<TransactionReason[]>;
}

export const TransactionRepo: ITransactionRepo = {
  getReasons: async (): Promise<TransactionReason[]> => {
    const response = await apiClient.get<TransactionReason[]>(
      "/transactions/reasons"
    );
    console.log(response.data);
    return response.data;
  },
};
