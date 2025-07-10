import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeDiffService {
  calculateYearDiff(prevDate: Date) {
    const now = new Date();
    const prev = new Date(prevDate);
    const diff = now.getTime() - prev.getTime();
    const oneYearInSeconds = 365 * 24 * 60 * 60 * 1000;
    const oneMonthInSeconds = 30 * 24 * 60 * 60 * 1000;

    const timeDiffInMonths = Math.floor(diff / oneMonthInSeconds);
    const timeDiffInYears = Math.floor(diff / oneYearInSeconds);
    const remainingMonths = timeDiffInMonths % 12;

    if (timeDiffInYears < 1) {
      return `${timeDiffInMonths} ${timeDiffInMonths > 1 ? 'months' : 'month'}`;
    } else {
      return `${timeDiffInYears} ${timeDiffInYears > 1 ? 'years' : 'year'}${
        remainingMonths > 0
          ? ` and ${remainingMonths} ${
              remainingMonths > 1 ? 'months' : 'month'
            }`
          : ''
      }`;
    }
  }
}
