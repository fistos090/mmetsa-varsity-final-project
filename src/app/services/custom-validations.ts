import { AbstractControl } from "@angular/forms";

const NAME_REGEXP = /^(?![ ]+$)[a-zA-Z0-9 ]+$/;
const CELL_CODES = ['071','072','073','074','076','078','079','081','082','083','084','060','064','065'];
const EMAIL_SURFIXS = ['gmail','yahoo','outlook'];

export class CustomValidations {

  static isValidName(control: AbstractControl) {
    if ((!NAME_REGEXP.test(control.value))) {
      return { 'invalidName': true };
    }
    return null;
  }

  static isValidCellCode(control: AbstractControl) {
      if (control) {
        if (control.value) {
          const code = control.value.substr(0,3);
          if ( CELL_CODES.find( cellCode => cellCode === code)  ) {
            return null;
          }
        }
      }

    return { 'isValidCellCode': true };
  }

  static isValidEmailDomain(control: AbstractControl) {
    let occurences = 0;
    if (control) {
      if (control.value) {
        const domain = control.value.substr(control.value.lastIndexOf('@')+1);
        if (domain) {
          EMAIL_SURFIXS.forEach( (sur: string) => {
            if (domain.indexOf(sur) > -1) {
              occurences++;
            }
          });
        }
      }
    }

    if (occurences < 2) {
      return null;
    }

    return { 'invalidEmailDomain': true };
  }
}