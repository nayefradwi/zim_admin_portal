import { writable } from "svelte/store";
import {
  getResponse,
  UnitRepo,
  type ResponseHandlerData,
  type Unit,
} from "../../data";

function createUnitStore() {
  const store = writable<Unit[]>([]);
  const { set, update, subscribe } = store;
  return {
    set,
    update,
    subscribe,
    getUnits: async () => {
      const details: ResponseHandlerData<Unit[]> = {
        call: () => UnitRepo.getUnits(),
        onSuccess: (data: Unit[]) => {
          store.set(data);
        },
      };
      getResponse<Unit[]>(details);
    },
  };
}

export const unitStore = createUnitStore();
