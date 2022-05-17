import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatPhoneNumber'
})
export class FormatPhoneNumberPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(/\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*/, '$1 $2 $3');
  }

}
