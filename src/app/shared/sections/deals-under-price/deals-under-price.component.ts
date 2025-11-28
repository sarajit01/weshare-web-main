import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-deals-under-price',
  templateUrl: './deals-under-price.component.html',
  styleUrls: ['./deals-under-price.component.css']
})
export class DealsUnderPriceComponent implements OnInit {

  @Input() price: any ;

  constructor() { }

  ngOnInit(): void {
  }

}
