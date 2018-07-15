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
  @Input() parentFormGroup: FormGroup;
  @Input() formControlErrorMessage: any
  

  placeholder = '';
  currentErrorMessage: string

  constructor() { }

  ngOnInit(): void {
    // const control = this.parentFormGroup.controls[this.data.name].invalid;
    // control.valueChanges.subscribe(value=>{
    //   console.log('***88 changing')
    //   for(const errorKey in control.errors){
    //     console.log('***88 changing', errorKey)
    //     if(this.errorMessages){
    //       this.currentErrorMessage = this.errorMessages[errorKey];
    //     }
        
    //     console.log('***88 changing', this.currentErrorMessage)
    //   }
    // })
  }

  ngOnChanges(): void {
    
  }

  removePlaceholder(): void {
    this.placeholder = '';
  }

  insertPlaceholder(): void {
    this.placeholder = this.data.placeholder;
  }
}
