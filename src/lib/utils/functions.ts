import { DateTime } from "luxon";
import {
  getResponse,
  type PaginatedModel,
  type PaginationQuery,
  type ResponseHandlerData,
} from "../../data";

export function parseDate(date: string): DateTime {
  return DateTime.fromISO(date);
}

export function getDifferenceInDays(date: DateTime): number {
  return date.diffNow("days").days;
}

export function getPage<T>(
  pageSize: number,
  cursor: string | undefined,
  direction: number,
  call: (query: PaginationQuery | undefined) => Promise<PaginatedModel<T>>
): Promise<PaginatedModel<T>> {
  const details: ResponseHandlerData<PaginatedModel<T>> = {
    call: () =>
      call({
        pageSize,
        cursor,
        direction,
      }),
    onSuccess: (data: PaginatedModel<T>) => {
      return data;
    },
  };
  return getResponse<PaginatedModel<T>>(details);
}

export function enforceNumber(
  event: Event,
  allowDecimals: boolean = false
): void {
  const input = event.target as HTMLInputElement;
  const cursorPosition = input.selectionStart;

  let numericValue = allowDecimals
    ? parseFloat(input.value)
    : parseInt(input.value, 10);

  if (Number.isNaN(numericValue)) return clearInput(input, cursorPosition);

  setNumberValue(input, numericValue, allowDecimals, cursorPosition);
}

function clearInput(input: HTMLInputElement, cursorPosition: number | null) {
  input.value = "";
  input.selectionStart = input.selectionEnd = cursorPosition;
}

function setNumberValue(
  input: HTMLInputElement,
  numericValue: number,
  allowDecimals: boolean,
  cursorPosition: number | null
) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: allowDecimals ? 5 : 0,
  });

  const value = formatter.format(numericValue);
  if (input.value == value) return;
  input.value = value;
  input.selectionStart = input.selectionEnd = cursorPosition;
}
