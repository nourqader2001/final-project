// src/app/validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nonNegativeNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null; // Handle if control value is null, undefined, or empty
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value >= 0 ? null : { nonNegative: true };
  };
}
