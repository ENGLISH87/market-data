/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedProperty',
  standalone: true,
})
export class NestedPropertyPipe implements PipeTransform {
  transform(obj: unknown, propertyStr: string): any {
    if (!obj || !propertyStr) {
      return null;
    }

    return propertyStr.split('.').reduce((acc, key) => acc?.[key as keyof unknown], obj);
  }
}
