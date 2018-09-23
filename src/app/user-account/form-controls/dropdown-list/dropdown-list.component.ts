import { Component, OnInit, Input } from '@angular/core';
import { DropdownList } from './dropdown-list.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css']
})
export class DropdownListComponent implements OnInit {

  @Input() data: DropdownList;
  @Input() showErrors: false;
  @Input() parentFormGroup: FormGroup;
  @Input() formControlErrorMessage: any

  isFocused

  constructor() { 

  }

  ngOnInit() {
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
