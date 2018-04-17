import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[validatePhone][formControlName],[validatePhone][formControl],[validatePhone][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneValidator), multi: true }
  ]
})
export class PhoneValidator implements Validator {
  constructor( @Attribute('validatePhone') public validatePhone: string) {}

  validate(c: AbstractControl): { [key: string]: any } {
    // self value (e.g. retype password)
    let v = c.value;

    // control value (e.g. password)
    //let e = c.root.get(this.validatePhone);
    let reg = new RegExp(/^[0-9]{10}$/)
    let validate = reg.test(v);

    // value not equal
    if (!validate) return {
      validatePhone: false
    }
    return null;
  }
}
