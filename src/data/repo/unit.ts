import { apiClient, type Unit } from "..";

export interface IUnitRepo {
  getUnits(): Promise<Unit[]>;
}

export const UnitRepo: IUnitRepo = {
  getUnits: async (): Promise<Unit[]> => {
    const response = await apiClient.get<Unit[]>("/products/units");
    return response.data;
  },
};
