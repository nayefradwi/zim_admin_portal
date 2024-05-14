export interface Unit {
  id: number;
  name: string;
  symbol: string;
}

export interface UnitConversion {
  id: number;
  toUnitId: number;
  fromUnitId: number;
  conversionFactor: number;
}

export function getMapKeyOfConversion(conversion: UnitConversion) {
  return `${conversion.toUnitId}-${conversion.fromUnitId}`;
}
