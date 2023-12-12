import { writable } from "svelte/store";
import {
  type TransactionReason,
  type ResponseHandlerData,
  TransactionRepo,
  ClientError,
} from "../../data";

function createTransactionReasonsStore() {
  const store = writable<TransactionReason[]>([]);
  const { subscribe, set } = store;
  return {
    subscribe,
    set,
    getReasons: () => GetReasons(),
  };
}
export const transactionReasonsStore = createTransactionReasonsStore();

function GetReasons() {
  const details: ResponseHandlerData<TransactionReason[]> = {
    call: () => TransactionRepo.getReasons(),
    onSuccess: (data: TransactionReason[]) => {
      transactionReasonsStore.set(data);
    },
    onError: (error: ClientError) => {
      console.log("failed to get reasons");
    },
  };
}
