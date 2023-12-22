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

  const numericValue = allowDecimals
    ? parseFloat(input.value)
    : Math.floor(Number(input.value));
  const cleanedValue = isNaN(numericValue) ? "" : numericValue.toString();

  // Update the input only if the value has changed to avoid cursor reset
  if (input.value !== cleanedValue) {
    input.value = cleanedValue;
    // Restore the cursor position
    input.selectionStart = input.selectionEnd = cursorPosition;
  }
}
