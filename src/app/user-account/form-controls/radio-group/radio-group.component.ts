import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css']
})
export class RadioGroupComponent implements OnInit {
  @Input() groupLabel: string;
  @Input() parentFormGroup: FormGroup;
  @Input() showErrors: false;
  @Input() data: RadioGroupData;
  @Input() formControlErrorMessage: any

  isFocused = false;
  
  constructor() { }

  ngOnInit() {
  }

}

export interface RadioGroupData{
  name: string;
  label: string;
  options: {name: string, label: string}[]
}
