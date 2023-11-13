import { DateTime } from "luxon";

export function parseDate(date: string): DateTime {
    return DateTime.fromISO(date);

}

export function getDifferenceInDays(date: DateTime): number {
    return date.diffNow('days').days;
}
