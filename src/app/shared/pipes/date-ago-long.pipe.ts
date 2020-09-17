import {Pipe, PipeTransform} from '@angular/core';

const intervals = {
  'year': 31536000,
  'month': 2592000,
  'week': 604800,
  'day': 86400,
  'hour': 3600,
  'minute': 60,
  'second': 1
};

@Pipe({
  name: 'dateAgoLong'
})
export class DateAgoLongPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        return 'just now';
      }

      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          const iPl = counter > 1 ? `${i}s` : i;
          return `${counter} ${iPl} ago`;
        }
      }
    }
    return value;
  }

}
