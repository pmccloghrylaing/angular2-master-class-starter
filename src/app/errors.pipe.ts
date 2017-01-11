import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errors'
})
export class ErrorsPipe implements PipeTransform {

  transform(value: any, name?: string): string[] {
    if (!value) {
      return null;
    }

    if (!name) {
      name = 'The field';
    }
    
    return Object.keys(value)
      .map(k => {
        switch (k) {
          case 'required':
            return `${name} is required.`;
          case 'minlength':
            return `${name} must have at least ${value[k].requiredLength} characters.`;
          case 'maxlength':
            return `${name} must have no more than ${value[k].requiredLength} characters.`;
          case 'validateEmail':
            return `${name} is not a valid email address.`;
          case 'checkEmailAsync':
            return `${name} is already taken.`;
          default:
            return `${name} is not valid (${k}).`;
        }
      });
  }

}
