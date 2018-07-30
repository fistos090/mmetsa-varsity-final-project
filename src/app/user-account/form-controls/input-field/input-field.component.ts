import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InputField } from './input-field.model';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit, OnChanges {

  @Input() data: InputField;
  @Input() showErrors: false;
  @Input() matDatepicker: any;
  @Input() parentFormGroup: FormGroup;
  @Input() formControlErrorMessage: any
  

  placeholder = '';
  isFocused = false;
  currentErrorMessage: string


  constructor() { }

  ngOnInit(): void {
    this.parentFormGroup.controls[this.data.name].valueChanges.subscribe((val) => {
      // this.showErrors = false;
    })
  }

  ngOnChanges(): void {
    
  }

  onFocus(){
    this.isFocused = true;
  }

  onFocusOut(): void {
    if (this.parentFormGroup.controls[this.data.name].valid) {
      this.isFocused = false;
    }
  }

}
