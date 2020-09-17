// modified version of https://medium.com/@thunderroid/angular-date-ago-pipe-minutes-hours-days-months-years-ago-c4b5efae5fe5
import {Pipe, PipeTransform} from '@angular/core';

const intervals = {
  'y': 31536000,
  'mo': 2592000,
  'w': 604800,
  'd': 86400,
  'h': 3600,
  'm': 60,
  's': 1
};

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        return 'now';
      }

      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          return counter + i;
        }
      }
    }
    return value;
  }
}
