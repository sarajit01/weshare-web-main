import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-business-info-button',
  templateUrl: './business-info-button.component.html',
  styleUrls: ['./business-info-button.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessInfoButtonComponent),
      multi: true,
    }
  ]
})
export class BusinessInfoButtonComponent implements ControlValueAccessor , OnInit {

  @Input() business: any ;
  @Input() listingType: String = 'business' ;
  routePrefix: String = '' ;

  constructor() { }

  ngOnInit(): void {
    if(this.listingType === 'business'){
      this.routePrefix = '/business-details/' ;
    } else {
      this.routePrefix = '/promotion-details/' ;
    }
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
