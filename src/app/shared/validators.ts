import { AbstractControl, ValidationErrors, FormArray } from '@angular/forms';

export function atLeastOneElement(
  control: AbstractControl
): ValidationErrors | null {
  const formArray = control as FormArray;
  if (formArray && formArray.length) {
    return null;
  }
  return { atLeastOneElement: true };
}
