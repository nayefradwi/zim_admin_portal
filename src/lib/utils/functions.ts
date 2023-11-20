import { DateTime } from "luxon";
import {
  getResponse,
  type PaginatedModel,
  type ResponseHandlerData,
} from "../../data";

export function parseDate(date: string): DateTime {
  return DateTime.fromISO(date);
}

export function getDifferenceInDays(date: DateTime): number {
  return date.diffNow("days").days;
}

export function getNext<T>(
  pageSize: number | 10,
  last: PaginatedModel<T> | null,
  getCall: (
    pageSize: number,
    sort: number,
    endCursor: string | undefined,
    previousCursor: string | undefined
  ) => ResponseHandlerData<PaginatedModel<T>>
) {
  if (last) {
    const { endCursor, previousCursor } = last;
    return getResponse(getCall(pageSize, 1, endCursor, previousCursor));
  }
  return getResponse(getCall(pageSize, 1, undefined, undefined));
}

export function getPrevious<T>(
  pageSize: number | 10,
  first: PaginatedModel<T> | null,
  getCall: (
    pageSize: number,
    sort: number,
    endCursor: string | undefined,
    previousCursor: string | undefined
  ) => ResponseHandlerData<PaginatedModel<T>>
) {
  if (first) {
    const { endCursor, previousCursor } = first;
    return getResponse(getCall(pageSize, -1, endCursor, previousCursor));
  }
  return getResponse(getCall(pageSize, -1, undefined, undefined));
}
