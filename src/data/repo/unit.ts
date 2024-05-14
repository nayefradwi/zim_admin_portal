import { apiClient, type Unit, type UnitConversion } from "..";

export interface IUnitRepo {
  getUnits(): Promise<Unit[]>;
  getAllUnitConversions(): Promise<Record<string, UnitConversion>>;
}

export const UnitRepo: IUnitRepo = {
  getUnits: async (): Promise<Unit[]> => {
    const response = await apiClient.get<Unit[]>("/products/units");
    return response.data;
  },

  getAllUnitConversions: async (): Promise<Record<string, UnitConversion>> => {
    const response = await apiClient.get<Record<string, UnitConversion>>(
      "/products/units/unit-conversions"
    );
    return response.data;
  },
};
