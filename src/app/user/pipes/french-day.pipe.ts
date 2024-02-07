import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frenchDay',
})
export class FrenchDayPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const options = { format: 'long', timeZone: 'UTC', locale: 'fr' };
    return new Intl.DateTimeFormat('fr', options).format(date);
  }
}
