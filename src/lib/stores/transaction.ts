import { writable } from "svelte/store";
import {
  type TransactionReason,
  type ResponseHandlerData,
  TransactionRepo,
  getResponse,
} from "../../data";

function createTransactionReasonsStore() {
  const store = writable<TransactionReason[]>([]);
  const { subscribe, set } = store;
  return {
    subscribe,
    set,
    getReasons: () => {
      const details: ResponseHandlerData<TransactionReason[]> = {
        call: () => TransactionRepo.getReasons(),
        onSuccess: (data: TransactionReason[]) => {
          set(data);
        },
      };
      return getResponse<TransactionReason[]>(details);
    },
  };
}
export const transactionReasonsStore = createTransactionReasonsStore();
