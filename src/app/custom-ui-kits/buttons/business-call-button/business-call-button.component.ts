import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-business-call-button',
  templateUrl: './business-call-button.component.html',
  styleUrls: ['./business-call-button.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessCallButtonComponent),
      multi: true,
    }
  ]
})
export class BusinessCallButtonComponent implements ControlValueAccessor {

  @Input() business: any ;

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
