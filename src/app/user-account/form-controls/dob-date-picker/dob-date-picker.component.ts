import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputField } from '../input-field/input-field.model';

@Component({
  selector: 'app-dob-date-picker',
  templateUrl: './dob-date-picker.component.html',
  styleUrls: ['./dob-date-picker.component.css']
})
export class DobDatePickerComponent implements OnInit {

  @Input() data: DOBPickerModel;
  @Input() showErrors: false;
  @Input() parentFormGroup: FormGroup;
  @Input() formControlErrorMessage: any

  placeholder = '';
  isFocused = false;
  currentErrorMessage: string
  disabled = true
  showWarning = false;
  minDate;
  maxDate;
  constructor() {
    const date = new Date();
    this.minDate = date.getFullYear() - 100 +'-01-01';

    let month = (date.getMonth() + 1).toString();
        month = month.length < 2 ? month = '0'+ month : month;

    this.maxDate = date.getFullYear() +'-'+ month +'-'+ date.getDate();
  }

  ngOnInit(): void {
    this.parentFormGroup.controls[this.data.pickerInput.name].valueChanges.subscribe((date) => {
      this.showWarning = new Date().getFullYear() - new Date(date).getFullYear() < 16;
    })
  }

  // datesFilter(date: Date) {
  //   const year = date.getFullYear();
  //   const currentyear = new Date().getFullYear();

  //   let isValidDate = true;

  //   if (year > currentyear + 1) {
  //     isValidDate = false;
  //   }


  //   return isValidDate;
  // }

  ngOnChanges(): void {

  }

  onFocus() {
    this.isFocused = true;
  }

  onFocusOut(): void {
    if (this.parentFormGroup.controls[this.data.pickerInput.name].valid) {
      this.isFocused = false;
    }
  }


}

export interface DOBPickerModel {
  pickerInput: InputField;

}