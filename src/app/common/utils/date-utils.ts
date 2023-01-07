/**
 *  @description Date utilities
 */
export class DateUtils {
  private static readonly isoFormat = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))?|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))?/;

  /**
   *  @description convert date of type string to date
   *  @param date date to be converted
   *  @param format the format of the date
   */
  static toDate(date: any, format: string): Date {
    if (typeof date === 'string' && this.isoFormat.test(date)) {
      const dateToCheck = new Date(date);
      if (dateToCheck instanceof Date && !isNaN(dateToCheck.getTime())) {
        return dateToCheck;
      }
    } else if (date instanceof Date) {
      return date;
    }
    const normalized = date.replace(/[^a-zA-Z0-9]/g, '-');
    const normalizedFormat = format
      .replace('mm', 'ii')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-');
    const formatItems = normalizedFormat.split('-');
    const dateItems = normalized.split('-');

    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    let yearIndex = formatItems.indexOf('yyyy');
    if (yearIndex == -1) {
      yearIndex = formatItems.indexOf('yy');
    }
    const hourIndex = formatItems.indexOf('hh');
    const minutesIndex = formatItems.indexOf('ii');
    const secondsIndex = formatItems.indexOf('ss');

    let year = yearIndex > -1 ? +dateItems[yearIndex] : 0;
    if (year < 1000) {
      year += 2000;
    }
    const month = monthIndex > -1 ? +dateItems[monthIndex] - 1 : 0;
    const day = dayIndex > -1 ? +dateItems[dayIndex] : 0;

    const hour = hourIndex > -1 ? +dateItems[hourIndex] : 0;
    const minute = minutesIndex > -1 ? +dateItems[minutesIndex] : 0;
    const second = secondsIndex > -1 ? +dateItems[secondsIndex] : 0;
    return new Date(year, month, day, hour, minute, second);
  }

  /**
   *  @description convert date of type string to utc date
   *  @param date date to be converted
   *  @param format the format of the date
   */
  static toUtcDateFormat = function (date: any, format: string = undefined): Date {
    return DateUtils.toUtcDate(DateUtils.toDate(date, format));
  };

  static toUtcDate(value: Date) {
    const date = new Date(
      Date.UTC(
        value.getFullYear(),
        value.getMonth(),
        value.getDate(),
        value.getHours(),
        value.getMinutes(),
        value.getSeconds()
      )
    );
    return date;
  }
  
  static toUtcDateFromString(value: string) {
    return DateUtils.toUtcDate(new Date(value));
  }
}
