import { writable } from "svelte/store";
import {
  getResponse,
  UnitRepo,
  type ResponseHandlerData,
  type Unit,
  type UnitConversion,
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
          set(data);
        },
      };
      return getResponse<Unit[]>(details);
    },
  };
}

export const unitStore = createUnitStore();

function createUnitConversionStore() {
  const store = writable<Record<string, UnitConversion>>({});
  const { set, update, subscribe } = store;
  return {
    set,
    update,
    subscribe,
    getAllUnitConversions: async () => {
      const details: ResponseHandlerData<Record<string, UnitConversion>> = {
        call: () => UnitRepo.getAllUnitConversions(),
        onSuccess: (data: Record<string, UnitConversion>) => {
          set(data);
        },
      };
      return getResponse<Record<string, UnitConversion>>(details);
    },
  };
}
export const unitConversionStore = createUnitConversionStore();
