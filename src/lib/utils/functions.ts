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
  endCursor: string | undefined,
  previousCursor: string | undefined,
  sort: number,
  call: (query: PaginationQuery | undefined) => Promise<PaginatedModel<T>>
): Promise<PaginatedModel<T>> {
  const details: ResponseHandlerData<PaginatedModel<T>> = {
    call: () =>
      call({
        pageSize,
        endCursor,
        previousCursor,
        sort,
      }),
    onSuccess: (data: PaginatedModel<T>) => {
      return data;
    },
    onError: (error: Error) => {
      console.log(error);
    },
  };
  return getResponse<PaginatedModel<T>>(details);
}
