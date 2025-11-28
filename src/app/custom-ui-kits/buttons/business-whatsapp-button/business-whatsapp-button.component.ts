import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-business-whatsapp-button',
  templateUrl: './business-whatsapp-button.component.html',
  styleUrls: ['./business-whatsapp-button.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessWhatsappButtonComponent),
      multi: true,
    }
  ]
})
export class BusinessWhatsappButtonComponent implements ControlValueAccessor {

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

  whatsApp() {
    window.location.href = 'https://wa.me/'+this.business.contacts.business_phone;
  }
}
