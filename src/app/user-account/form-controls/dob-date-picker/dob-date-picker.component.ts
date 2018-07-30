import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '../../../../node_modules/@angular/forms';
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

  constructor() { }

  ngOnInit(): void {
    this.parentFormGroup.controls[this.data.pickerInput.name].valueChanges.subscribe((val) => {
      // this.showErrors = false;
    })
  }

  ngOnChanges(): void {
    
  }

  onFocus(){
    this.isFocused = true;
  }

  onFocusOut(): void {
    if (this.parentFormGroup.controls[this.data.pickerInput.name].valid) {
      this.isFocused = false;
    }
  }


}

export interface DOBPickerModel{
  pickerInput: InputField;

}