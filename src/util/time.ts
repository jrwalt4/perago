import * as moment from 'moment';

export function getFullDate(timestamp: number): number {
  return moment(timestamp).startOf('day').valueOf();
}