import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOfBirthToAge'
})
export class DateOfBirthToAgePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    value = new Date(value);
    const diff_ms = Date.now() - value.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

}
